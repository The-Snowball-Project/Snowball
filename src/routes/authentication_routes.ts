import Route from '../types/route';
import bcrypt from 'bcrypt';

const login:Route = ['/login','GET','optional', async (req:any,res:any) => {
    if (req.auth) {
        res.redirect('/');
        return;
    }

    if (!req.body.username || !req.body.password) {
        res.redirect('/login');
        return;
    }

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
        res.redirect(`/login?username=${encodeURI(req.body.username)}&status=incorrect_credentials`);
        return;
    }

    if (await bcrypt.compare(req.body.password,loginInfo!.Password)) {
        res.status(200).contentType('json').send(`{"token":"${authenticator.createToken(loginInfo.UserID,loginInfo.IsAdmin)}`);
        return;
    }

    res.redirect(`/login?username=${encodeURI(req.body.username)}&status=incorrect_credentials`);
    return;
}];



const routeList:Route[] = [
    login,
]

export default routeList;
