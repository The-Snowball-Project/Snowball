import pool from '../../dbconfig/dbconfig';

class TestController {

    public async get(req:Request, res:any) {
        console.log("get test controller!");
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
        res.end();
    }
    public async post(req:Request, res:any) {
        console.log("post test controller!");
        try {
            const client = await pool.connect();

            const sql = "SELECT * FROM test";
            const { rows } = await client.query(sql);
            const test = rows;

            client.release();
            console.log("post test",test);
            res.send("I HEAR YOU!");
        } catch (error) {
            res.status(400).send(error);
        }
        res.end();
    }
    public async get_by_id(req:Request, res:any){
        console.log("get by id test controller!");
//        const params = req.body;
  //      console.log(params);
        try {
            const client = await pool.connect();

            const sql = `SELECT * FROM test where ${1}`;
            const { rows } = await client.query(sql);
            const test = rows;

            client.release();
            console.log("post test",test);
            res.send("I HEAR YOU!");
        } catch (error) {
            res.status(400).send(error);
        }
        res.end();
    }
    
    //more functions to come

}

export default TestController;