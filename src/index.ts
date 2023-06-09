import * as express from 'express';
import server from './server';
import { promises } from 'winston-daily-rotate-file';
const process_port:string = process.env.PORT||"0";
const port: number = parseInt(process_port) || 3000;


const starter = new server().start(port)
  .then(port => console.log(`Running on port ${port}`))
  .catch(error => {
    console.log(error)
  });