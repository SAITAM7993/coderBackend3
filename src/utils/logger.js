//LOGUO PERSONALIZADO CON WINSTON
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

//Custom format
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`; //seteo el formato a fecha, nivel, mensae
});

export const logger = createLogger({
  level: 'info', // Nivel mínimo de log
  format: combine(
    // colorize(), //agrego colores al formato
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), //le doy el formato de fecha que quiera
    customFormat
  ),
  transports: [
    new transports.Console({
      format: combine(
        format.colorize(), // Colores solo para la consola
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      ),
    }), //consola, con esto solo pongo colores en la consola y no en los logs, hace que no se muestren los codigos de colores en el log
    new transports.File({ filename: 'logs/error.log', level: 'error' }), //guarda unicamente el nivel error en archivo error
    new transports.File({ filename: 'logs/combined.log' }), //guarda todos los niveles en archivo conbined
  ],
});
