import Route from '../types/route';


const exampleRoute:Route = ['/hello','GET',  async (req:Request,res:any)=>{
    res.status(200).send('hello!');
},'admin'];


//put all the routes in an array, and export that array.
const exampleRoutes:Array<Route> = [
    exampleRoute
]

export default exampleRoutes;
