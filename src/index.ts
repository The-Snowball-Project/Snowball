import app from './server';
import logger from './util/logger';
import router from './router';
import test from './schemaTest';

test();

const process_port:string = process.env.PORT||"0";
const port: number = parseInt(process_port) || 3000;

app.use('/api',router);

app.listen(port,()=>logger.info(`Listening on port ${port}`));
