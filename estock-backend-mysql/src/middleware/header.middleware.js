module.exports = function (app) {
    app.use(function (req, res, next) {
      /*  res.header(
            "Access-Control-Allow-headers",
            "x-access-token, Origin, Content-Type, Accept",
        );*/
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Headers', 'Origin, x-access-token, Content, Accept, content-type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });
}