const logger = require('../startup/winston-logger');


module.exports = function (err, req, res, next) {
    logger.error(err.message, err);
    res.status(500).send('something failed');
};