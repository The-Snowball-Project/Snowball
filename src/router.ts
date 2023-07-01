import express from 'express';
import {glob} from 'glob'
import path from 'path';
import logger from './util/logger';
import Route from './types/route';

//key index issue with types:so any
const router:any = express.Router(); 
const routesList: Route[] = [];

logger.info('Importing routes...')

glob.sync( 'src/routes/**/*.ts' ).forEach((file:string)=>{
    routesList.push(...require(path.resolve(file)).default);
});
for (const [path,method,auth,handler] of routesList) {
    logger.info(`Adding route: /api${path}`);
    try{
        router[(method).toLowerCase()](path,global.authenticator.resolve(auth,handler));
    }catch(e){
        logger.error(`Error adding route /api${path}, error:\n${e}`);
    }   
}

logger.info("exporting router");

export default router
