const {createLogger, format, transports} = require("winston");
const {combine, timestamp, label, printf} = format
const {MongoDB} = require("winston-mongodb");


const myformat = printf(({level, message, label, timestamp})=>{
    return `${timestamp} [${label}] ${level} ${message}`
})
const logger = createLogger({
    format : combine(
        label ({label : "logger"}),
        timestamp(),
        myformat
    ),
    transports :[ new transports.File({
        filename : "app.log",
        level : "info"
    })]
})

function logRequest(req,res,next) {
const IP = req.socket.remoteAddress
const Method = req.method;
const url = req.url;

console.log(Method, url,IP);
logger.log({
    level : "ingo",
    message : `A ${Method} request made on ${url} from IP ${IP}`
})
next()
}

// const logger = winston.createLogger({
//     level : "info",
//     format : winston.format.json(),
//     transports : [
//         new MongoDB({
//             db : process.env.mongoURL,
//             collection : "logs",
//             options : {
//                 useUnifiedTopology : true
//             }
//         })
//     ]
// })

module.exports = {
    logger,
    logRequest
}