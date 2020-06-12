const jwt = require('jsonwebtoken');
const config = require('config');
const db = require('../models/index');
const User = db.users;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) return res.status(400).send('Aucun token fourni');
    jwt.verify(token, config.get('jwtPrivateKey'), (error, decoded) => {
        if (error) return res.status(401).send('non autorisé');
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i=0; i < roles.length; i++){
                if(roles[i].name === 'admin'){
                    next();
                    return;
                }
            }
            res.status(403).send('Vous devez disposer des droits administrateur.');
            return;
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i=0; i<roles.length; i++){
                if (roles[i].name === "moderator"){
                    next();
                    return;
                }
            }
            res.status(403).send('Vous devez disposer des droits de moderator.');
            return;
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(userId).then(user => {
        user.getRoles().then(roles => {
            for (let i=0; i<roles.length; i++){
                if (roles[i].name === "moderator"){
                    next();
                    return
                }
                if (roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send('Droit admin ou moderator requis.');
            return;
        });
    });
};

const jwtAuth = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = jwtAuth;