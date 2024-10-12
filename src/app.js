import express from 'express';
// import mongoose from "mongoose";
import { connectMongoDB } from './config/mongoDB.config.js'; //para conectar a mongo parametrizado

import cookieParser from 'cookie-parser';
import router from './routes/index.js';

import { errorHandle } from './errors/errHandle.js'; //manejador de errores
import { logger } from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 8080;
connectMongoDB(); //conecto con mongo

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

// Middleware para manejo de errores, los endpoints atrapan los errores y lo derivan al errorhandle, debe ir luego de los endpoints
app.use(errorHandle);

app.listen(PORT, () => logger.info(`Listening on ${PORT}`));
