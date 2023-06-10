const express = require('express');
import * as glob from 'glob'
import logger from './util/logger';
import * as path from 'path';
const router:any = express.Router();

const routes_list:Array<[string,string,Function]> = [];
logger.info('Importing routes...')

glob.sync( 'src/routes/*.ts' ).forEach((file:any)=>{
    routes_list.push(require(path.resolve(file)).default);
});
  
for(const [path,method,fn] of routes_list) {
    logger.info(`Adding route: ${path}`);
    try{
        router[(method).toLowerCase()](path,fn);
    }catch(e){
        logger.warn(e);
    }   
}

logger.info('Added all routes!');

export default router