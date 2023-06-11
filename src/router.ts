import express from 'express';
import {glob} from 'glob'
import logger from './util/logger';
import path from 'path';
//key index issue with types:so any

type Method = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE' ;
type Handler = (arg0: Request, arg1: Response) => (void | Promise<void>);
type Route = [string, Method, Handler];

const router:any = express.Router(); 
const routesList: Route[] = [];

logger.info('Importing routes...')

glob.sync( 'src/routes/**/*.ts' ).forEach((file:string)=>{
    routesList.push(require(path.resolve(file)).default);
});
  
for(const [path,method,fn] of routesList) {
    logger.info(`Adding route: ${path}`);
    try{
        router[(method).toLowerCase()](path,fn);
    }catch(e){
        logger.warn(e);
    }   
}

logger.info('Added all routes!');

export default router
