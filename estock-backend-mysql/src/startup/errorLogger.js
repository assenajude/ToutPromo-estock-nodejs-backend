const winston = require('winston');
const errorLogger = require('./winston-logger');
require('express-async-errors');

module.exports = function () {
    process.on('uncaughtException', ex => {
            errorLogger.error(ex.message, ex);
            process.exit(1)
            })

    process.on('unhandledRejection', ex =>{
            errorLogger.error(ex.message, ex);
            process.exit(1);
        })

};

