import pool from '../dbconfig/dbconfig';
import Route from '../types/route';



const exampleRoute:Route = ['/','GET',  (req:Request,res:any)=>{
    //it should be wrapped in a try catch;
    try {
        const sql = "SELECT * FROM test";
        const params = null;
        pool
            .connect()
            .then((db:any)=>db
                .query(sql,params,(error:Error,data:any)=>{
                    if (error) throw error
                    res.status(200)
                        .send(data.rows);
                    db.release();
                    res.end();
                })
            );
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
