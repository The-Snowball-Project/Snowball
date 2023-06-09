const express = require("express"); 
import TestController from './TestController';

const TestRouter = function(req:Request, res:any, next:any){
    const router:any = express.Router();
    const controller = new TestController();
    //wire functions to routes here
    router.get(controller.get(req,res));
    return router    
}

export default TestRouter;
