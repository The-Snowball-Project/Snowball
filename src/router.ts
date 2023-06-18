import express from 'express';
import {glob} from 'glob'
import path from 'path';
import logger from './util/logger';
import Route from './types/route'
//key index issue with types:so any


const router:any = express.Router(); 
const routesList: Route[] = [];

logger.info('Importing routes...')

glob.sync( 'src/routes/**/*.ts' ).forEach((file:string)=>{
    routesList.push(...require(path.resolve(file)).default);
});
for(const [path,method,fn] of routesList) {
    logger.info(`Adding route: ${path}`);
    try{
        router[(method).toLowerCase()](path,fn);
    }catch(e){
        logger.error(`${method} is not a method of the router.\n${e}`);
    }   
}

logger.info("exporting router");

export default router
