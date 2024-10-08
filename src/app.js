import express from 'express';
import { connectMongoDB } from './config/mongoDB.config.js';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { errorHandle } from './errors/errHandle.js';

const app = express();
const PORT = process.env.PORT || 8080;
connectMongoDB(); //conecto con mongo

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);

// Middleware para manejo de errores, los endpoints atrapan los errores y lo derivan al errorhandle
app.use(errorHandle);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
