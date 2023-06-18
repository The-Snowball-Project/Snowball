import Route from '../types/route';


const exampleRoute:Route = ['/','GET',  async (req:Request,res:any)=>{
}];


//put all the routes in an array, and export that array.
const exampleRoutes:Array<Route> = [
    exampleRoute
]

export default exampleRoutes;
