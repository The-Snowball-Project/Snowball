import * as express from 'express';
import {Request,Response} from "express";
const app = express()

const port:string = process.env.PORT || "3000";

app.get('/', (req:Request, res: Response) => {
  res.send('')
})

app.listen(port, () => {
  console.log(`testing listening on port ${port}`)
})