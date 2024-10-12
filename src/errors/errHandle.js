//MANEJJADOR DE ERRORES
import { logger } from '../utils/logger.js';

export const errorHandle = (err, req, res, next) => {
  const status = err.status || 500;
  logger.error(`${err.path} | ${err.message}`); //para mostrar en donde fue el error
  const message = status === 500 ? 'Internal server error' : err.message; //SI status 500 tiro internal server error, sino muestro el mensajje
  res.status(status).json({ status: 'error', error: message });
};
