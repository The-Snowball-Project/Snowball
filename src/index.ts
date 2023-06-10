import * as express from 'express';
import app from './server';
import logger from './util/logger';
import * as fs from 'fs'; // require is necessery for some reason, fs is undefined otherwise
import * as path from 'path'; // same for this

const process_port:string = process.env.PORT||"0";
const port: number = parseInt(process_port) || 3000;
const router = express.Router();


logger.info('Importing routes...')

const routes_list:Array<[string,string,(req:any,res:any)=>any]> = [];
// read all files recursivly from src/routes and filter out all but .ts files
for (const file of fs.readdirSync("src/routes",{recursive:true,withFileTypes:true}).filter((file:any)=>file.name && path.extname(file.name)==='.ts')) {
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
    switch (route[1]) {
        case "ALL":
            router.all(route[0],route[2]);
        case "GET":
            router.get(route[0],route[2]);
            break;
        case "POST":
            router.post(route[0],route[2]);
            break;
        case "HEAD":
            router.head(route[0],route[2]);
            break;
        case "PUT":
            router.put(route[0],route[2]);
            break;
        case "DELETE":
            router.delete(route[0],route[2]);
            break;
        case "OPTIONS":
            router.options(route[0],route[2]);
            break;
        default:
            logger.warn(`Unknown method "${route[1]}" for route "${route[0]}"`);
            break;
    }
    
    logger.info(`Added route "${route[0]}"`);
}

logger.info('Added all routes!');

app.use('/',router);

app.listen(port,()=>logger.info(`Listening on port ${port}`));
