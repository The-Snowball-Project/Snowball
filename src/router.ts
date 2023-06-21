import express from 'express';
import {glob} from 'glob'
import path from 'path';
import logger from './util/logger';
import Route from './types/route';
import Authenticator from './util/authenticator';

//key index issue with types:so any
const router:any = express.Router(); 
const routesList: Route[] = [];
const authenticator = new Authenticator();

logger.info('Importing routes...')

glob.sync( 'src/routes/**/*.ts' ).forEach((file:string)=>{
    routesList.push(...require(path.resolve(file)).default);
});
for(const [path,method,handler,auth] of routesList) {
    logger.info(`Adding route: '${path}'`);
    try{
        router[(method).toLowerCase()](path,authenticator.resolve(auth,handler));
    }catch(e){
        logger.error(`Error adding route '${path}', error:\n${e}`);
    }   
}

logger.info("exporting router");

export default router
