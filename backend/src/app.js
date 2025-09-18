import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';


dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));


app.use('/', indexRouter);
app.use('/api/auth', authRouter);

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// central error handler
app.use(errorHandler);

export default app;
