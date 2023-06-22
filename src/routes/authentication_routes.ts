import Route from '../types/route';
import bcrypt from 'bcrypt';
import logger from '../util/logger';

const login:Route = ['/login','POST','optional', async (req:any,res:any) => {
    
    if (req.auth) {
        res.status(200).contentType('json').send(`{"status":"success","token":"${req.cookies.auth}"}`);;
        return;
    }

    if (!req.body.username || !req.body.password) {
        res.redirect('/login');
        return;
    }

    res.status(200).contentType('json');

    const loginInfo = await prismaClient.loginInfo.findUnique({
        select: {
            Password:true,
            UserID:true,
            IsAdmin:true
        },
        where: {
            Email:req.body.username
        }
    });

    if (!loginInfo) {
        res.send(`{"status":"invalid_credentials"`);
        return;
    }

    if (await bcrypt.compare(req.body.password,loginInfo!.Password)) {
        res.send(`{"status":"success","token":"${authenticator.createToken(loginInfo!.UserID,loginInfo!.IsAdmin)}"}`);
        return;
    }

    res.send(`{"status":"invalid_credentials"`);
    return;
}];

const logout:Route = ['/logout','ALL','required',(req:any,res:any)=>{
    authenticator.invalidate(req.cookies.auth);
    res.redirect('/');
}]

const routeList:Route[] = [
    login,
    logout,
]

export default routeList;
