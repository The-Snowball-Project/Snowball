import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());
//app.use(helmet()); temporarily disabled, this should be enabled in prod
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
export default app;
