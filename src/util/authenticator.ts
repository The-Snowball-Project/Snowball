import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import logger from './logger';
import fs from 'fs';
import {Auth,Handler} from '../types/route';

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
     * (so returns the original request handler if the auth level is 'none')
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

            if (req.cookies.auth) {
                const auth = this.verify(req.cookies);
            }
            if (requireAuth) res.status(401).send('unauthorized');

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

        if (this.currentTokenID==2_147_483_647) this.currentTokenID = 0; // if at signed 4 byte int limit, wrap around to 0
        
        return token
    }

    /**
     * 
     * @param token the token to verify
     * @returns
     */
    verify(token:string):{valid:boolean,userID:String,isAdmin:boolean} {
        let result;
        try {
            result = jwt.verify(token,this.publicKey,{algorithms:[this.algorithm]}) as JwtPayload;
        } catch (e) {}

        if (!result || this.invalidatedTokens.has(result.tokenID))
            return {valid:false,userID:'',isAdmin:false};
        
        return {valid:true,userID:result.userID,isAdmin:result.isAdmin};
    }

    /**
     * 
     * @param token token to invalidate
     * @returns false if the token was invalid, true on success
     */
    invalidate(token:string):boolean {
        const result = jwt.verify(token,this.privateKey);
        if (typeof result === 'string')
            return false;
        this.invalidatedTokens.set(result.userID,result.exp!);
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

