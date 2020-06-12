const cors = require('cors');
const express  = require('express');

const bodyParser = require('body-parser');
const errorMiddleware = require('../middleware/error-middleware');

module.exports = function (app) {

    let corsOptions = {
        origin: "http://localhost:8080"
    };

    app.use(cors(corsOptions));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}) );
    app.use(errorMiddleware);

}