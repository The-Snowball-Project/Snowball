import './preinitilization';
import './tests/run_tests';
import app from './server';
import logger from './util/logger';
import router from './router';

// NOTE: prismaClient and authenticator are global variables, be careful not to overwrite them (declared in preinitilization.ts)

// quick test user
import bcrypt from 'bcrypt';
const start = new Date();
const passwordHash = bcrypt.hashSync('Password123',12); // took ~183ms on a ryzen7 4800H @ 2.9GHz
const end = new Date();
logger.info(`Time to hash: ${end.getMilliseconds()-start.getMilliseconds()}ms`); // yes, this is sometimes negative, I'm lazy
(async () => {
    await prismaClient.loginInfo.deleteMany({});
    logger.info(JSON.stringify(await prismaClient.loginInfo.create({
        data: {
            Email:'admin',
            Password:passwordHash,
            IsAdmin:true
        }
    })));
    logger.info(JSON.stringify(await prismaClient.loginInfo.create({
        data: {
            Email:'testuser',
            Password:passwordHash,
            IsAdmin: false
        }
    })));
})();

const process_port:string = process.env.PORT||"0";
const port: number = parseInt(process_port) || 3000;

app.use('/api',router);

app.post('/test',(req,res)=>{
    
})

app.listen(port,()=>logger.info(`Listening on port ${port}`));
