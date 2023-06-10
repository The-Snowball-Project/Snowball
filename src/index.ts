import app from './server';
import routes_list from './routes/routes_list';
const process_port:string = process.env.PORT||"0";
const port: number = parseInt(process_port) || 3000;

for(const route of routes_list){
    app.use(route[0],route[1])
}

app.listen(port,()=>console.log("listening",port))