import app from './server';
//import routes_list from './routes/routes_list';
import fs from 'fs';

console.log("wefrgthbyjkterwopqidejrhbgjdriefjkrnf why the fuck is this not foring ffs")

const process_port:string = process.env.PORT||"0";
const port: number = parseInt(process_port) || 3000;

const routes_list:Array<[string,Function]> = await (async ():Promise<Array<[string,Function]>> => {
    const route_files:string[] = await new Promise((resolve, _reject) => {
        fs.readdir('./src/commands', async (err, files) => {
            if (err) {
                console.error(`\033[32mFailed to get route, error: ${err}\033[0m`)
            }
            resolve(files);
        });
    });
    const routes_list:Array<[string,Function]> = [];
    for (const file of route_files) {
        routes_list.push((await import(`./routes/${file}`)).default)
    }
    console.log(routes_list);
    return routes_list;
})();

for(const route of routes_list){
    app.use(route[0],route[1])
}

app.listen(port,()=>console.log("listening",port))