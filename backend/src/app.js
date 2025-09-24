import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';
import { createTablesAndIndexes } from './db/init_db.js';
import { testConnection } from './db/index.js';

dotenv.config();

console.log("FRONTEND_URL from env:", process.env.FRONTEND_URL)

const app = express();
testConnection();
createTablesAndIndexes ();

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