const express = require('express');
import logger from './util/logger';
import * as fs from 'fs';
import * as path from 'path';
const router = express.Router();

const routes_list:Array<[string,string,Function]> = [];
logger.info('Importing routes...')

// read all files recursively from src/routes and filter out all but .ts files
for (const file of fs.readdirSync("src/routes",{recursive:true,withFileTypes:true})
    .filter((file:any)=>file.name && path.extname(file.name)==='.ts')) {
    try {
        // import route from each file using the path returned by readdirSync() so subdirectories
        // work and add it to the list of routes
        routes_list.push(require(`../${file.path}/${file.name.split('.')[0]}`).default);
    } catch (e:any) {
        logger.warn(`Failed to import "${file.path}/${file.name}"`)
    }
}

logger.info('Adding routes...');


for(const route of routes_list) {
    const method = route[1];
    const path = route[0];
    const fn = route[2];
    try{
        router[method](path,fn);
        logger.info(`Added route "${route[0]}"`);
    }catch(e){
        console.log(e,"is error");
        logger.warn(`Unknown method "${route[1]}" for route "${route[0]}"`);
    }
    
}

logger.info('Added all routes!');

export default router