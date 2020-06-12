process.env["NODE_CONFIG_DIR"] = __dirname + "/src/config";
const config = require("config");
const express = require('express');
const db = require('./src/models/index');

const roleInit = require('./src/startup/roleInit');

const app = express();


db.sequelize.sync().then(() => {
    //roleInit();
});
require('./src/startup/config')();
require('./src/startup/middlewares')(app);
app.use((req, res, next)=> {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//require('./src/middleware/header.middleware')(app);

require('./src/startup/errorLogger')();

require('./src/startup/routes')(app);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le server est lancé sur le port ${PORT}`);
} );

