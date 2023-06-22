import jwt, { JwtPayload } from 'jsonwebtoken';
import fs from 'fs';
import {Auth,Handler} from '../types/route';
import getErrorPage from './error_pages';
import logger from './logger';

/**
 * the authenticator class which handles everythig related to authentication, such as:
 * creating tokens, verifying tokens, invalidating tokens and adding authentication and
 * authorization prerequisites to request paths
 * 
 */
class Authenticator {
    
    private privateKey:string = fs.readFileSync(__dirname+'/../../JWT_SECRET.key','utf8');
    private publicKey:string = fs.readFileSync(__dirname+'/../../JWT_SECRET.pub','utf8');

    private algorithm:jwt.Algorithm = 'RS256';

    private invalidatedTokens:Map<number,number> = new Map();

    private currentTokenID = 0;

    public constructor() {
        setInterval(this.removeInvalid.bind(this),1000*60*60*24); // set job to run once a day
    }

    /**
     * resolves an auth level and a request handler to a single request handler
     * which drops requests that dont meet the provided auth prerequisites
     * 
     * it also adds req.auth for authenticated requests, which is the object
     * returned by this.verify(token) ({valid:boolean,userID:boolean,isAdmin:boolean},
     * valid is always true in this case)
     * 
     * @param auth required auth level
     * @param handler route handler to call
     * @returns the provided handler or a handler that calls the provided handler
     */
    public resolve(auth:Auth,handler:Handler):Handler {
        
        if (auth === 'none') return handler;

        const requireAuth = !(auth === 'optional')
        const requireAdmin = auth === 'admin';

        return ((req:any,res:any):void | Promise<void> => {

            // this code is ugly and annoying to read but idk
            // how to make it better without fall through
            // switch cases and goto statements
            logger.info(JSON.stringify(req.cookies))
            if (req.cookies.auth) {
                const auth = this.verify(req.cookies.auth);

                if (!auth.valid) {
                    if (requireAuth) {
                        res.status(401).send(getErrorPage(401));
                        return;
                    } else
                        return handler(req,res);
                }

                if (requireAdmin && !auth.isAdmin) {
                    res.status(403).send(getErrorPage(403));
                    return;
                }

                req['auth'] = auth;

                return handler(req,res);

            } else if (requireAuth) {
                res.status(401).send(getErrorPage(401));
                return;
            } else
                return handler(req,res);
        }).bind(this);
    }

    /**
     * creates a new token for the provided userID
     * 
     * @param userID the userID to create the token for
     * @param admin if the user is an admin or not
     * @returns the generated token
     */
    public createToken(userID:String,admin:boolean):string {

        // if at signed 4 byte int limit, wrap around to 0
        if (this.currentTokenID==2_147_483_647) this.currentTokenID = 0;

        const token = jwt.sign(
            {
                userID:userID,
                tokenID:this.currentTokenID++,
                isAdmin:admin
            },
            this.privateKey,
            {
                algorithm:this.algorithm,
                expiresIn:'5d'
            }
        );
        
        return token
    }

    /**
     * 
     * @param token the token to verify
     * @returns
     */
    verify(token:string):{valid:true,userID:String,isAdmin:boolean} | {valid:false,tokenExpired:boolean} {
        let result;
        let tokenExpired = false;
        try {
            result = jwt.verify(token,this.publicKey,{algorithms:[this.algorithm]}) as JwtPayload;
        } catch (e:any) {
            tokenExpired = e.name === 'TokenExpiredError';
        }

        if (!result || this.invalidatedTokens.has(result.tokenID))
            return {valid:false,tokenExpired:tokenExpired};
        
        return {valid:true,userID:result.userID,isAdmin:result.isAdmin};
    }

    /**
     * invalidates a token
     * 
     * @param token token to invalidate
     * @returns true on success, false if the token was invalid
     */
    invalidate(token:string):boolean {
        let result;
        try {
            result = jwt.verify(token,this.publicKey,{algorithms:[this.algorithm]}) as JwtPayload;
        } catch (e) {}

        if (!result) return false;

        this.invalidatedTokens.set(result.tokenID,result.exp!);

        return true;
    }

    /**
     * removes all expired tokens from invalidatedTokens
     */
    removeInvalid() {
        const invalid:number[] = [];
        const now = new Date().getTime();

        this.invalidatedTokens.forEach((date:number,id:number) => {
            if (date <= now) invalid.push(id);
        });

        for (const id of invalid)
            this.invalidatedTokens.delete(id);
    }
}

export default Authenticator;

