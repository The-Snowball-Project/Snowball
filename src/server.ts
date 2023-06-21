import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from "helmet";
import cookieParse from 'cookie-parser';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
export default app;
