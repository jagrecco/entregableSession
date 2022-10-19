import {createLogger, format, transports} from 'winston';

export default createLogger({
    format: format.combine(format.simple(),
    format.timestamp(),
    format.printf(info=>`[${info.timestamp}  Level: ${info.level}  ${info.message}]`)
    ),
    transports:[
        new transports.File({ filename: `../logs/warn.log`, level: "warn" }),
        new transports.File({ filename: `../logs/error.log`, level: "error" }),
        new transports.Console({level: `info`}),
    ]
})