import { response } from 'express';
import pool from '../dbconfig/dbconfig';
const route = ['/','GET',  (req:Request,res:any)=>{
    try {
        const sql = "SELECT * FROM test";
        const params = null
        pool
            .connect()
            .then((db:any)=>db
                .query(sql,params,(error:Error,data:any)=>{
                    if (error) throw error
                    res.status(200)
                        .send(data.rows);
                    db.release();
                    res.end();

            }));
    } catch (error) {
        res.status(400)
            .send(error);
        res.end();

    }
}];

export default route;
