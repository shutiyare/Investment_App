import winston from 'winston';
const { createLogger } = winston;

const myformat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

export default createLogger({
    transports: [
        new winston.transports.Console({
            format: myformat
        })
    ]
});