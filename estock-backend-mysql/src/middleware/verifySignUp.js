const db = require('../models/index');
const User = db.users;
const ROLES = db.ROLES;


checkDupplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) return res.status(400).send({message: 'Echec! cet utilisateur existe deja.'});

    });

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) return res.status(400).send({message: `l'utilisateur que vous essayez d'enregister existe deja`})
    });
    next();
};

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for(i = 0; i < req.body.roles; i++){
            if (!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Le role ${req.body.roles[i]} n'esxiste pas`
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDupplicateUsernameOrEmail: checkDupplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp;