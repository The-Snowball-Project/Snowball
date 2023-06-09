import pool from '../../dbconfig/dbconfig';

class TestController {

    public async get(req:Request, res:any) {
        console.log("get test controller!",req);
        try {
            const client = await pool.connect();

            const sql = "SELECT * FROM test";
            const { rows } = await client.query(sql);
            const test = rows;

            client.release();

            res.send(test);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    //more functions to come

}

export default TestController;