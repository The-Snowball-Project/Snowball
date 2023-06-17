import DB from '../dbconfig/dbconfig';
import Route from '../types/route';


const exampleRoute:Route = ['/','GET',  async (req:Request,res:any)=>{
    //it should be wrapped in a try catch;
    // if(!req.authorized()) req.send("some default?")
    try {
        const tests:any[] = await DB.test.findMany();    
        res.status(200)
            .json(tests);
        res.end();
                
    } catch (error) {
        res.status(400)
            .send(error);
        res.end();
    }
}];

//put all the routes in an array, and export that array.

const exampleRoutes:Array<Route> = [
    exampleRoute
]

export default exampleRoutes;
