"use strict";

let winston         = require('winston');
winston.emitErrs    = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            timestamp: () => new Date(),
            formatter: (options) => {
                // Return string will be passed to logger.
                return options.timestamp().toISOString() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
            },
            level: 'debug',
            handleExceptions: false,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
logger.exitOnError = false;

module.exports = logger;
module.exports.stream = {
    write: (message, encoding) => logger.info(message)
};
