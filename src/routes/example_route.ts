import Route from '../types/route';
import logger from '../util/logger';


const exampleRoute:Route = ['/hello', 'GET', 'admin', async (req:any,res:any)=>{
    res.status(200).send('hello!');
}];

//put all the routes in an array, and export that array.
const exampleRoutes:Array<Route> = [
    exampleRoute
]

export default exampleRoutes;
