import jwt from 'jsonwebtoken';
import logger from './logger';

const secret:string = process.env.JWT_SECRET!;

const invalidatedTokens:Map<number,Date> = new Map();

setInterval(removeInvalid,1000*60*60*24); // set job to run once a day

let currentTokenID = 0;

/**
 * creates a new token for the provided userID
 * 
 * @param userID the userID to create the token for
 * @returns the generated token
 */
function createToken(userID:String):string {
    const token = jwt.sign(
        {
            userID:userID,
            tokenID:currentTokenID++
        },
        secret,
        {
            algorithm:'RS512',
            expiresIn:'5d'
        }
    );

    if (currentTokenID==2_147_483_647) currentTokenID = 0; // if at signed 4 byte int limit, wrap around to 0
    
    return token
}

/**
 * 
 * @param token the token to verify
 */
function verifyToken(token:string) {
    logger.info(JSON.stringify(jwt.verify(token,secret)));
}

/**
 * removes all expired token ids from invalidatedTokens
 */
function removeInvalid() {
    const invalid:number[] = [];
    const now = new Date().getTime();

    invalidatedTokens.forEach((date:Date,id:number) => {
        if (date.getTime() <= now) invalid.push(id);
    });

    for (const id of invalid)
        invalidatedTokens.delete(id);
}


