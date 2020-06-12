const db = require('../models/index');
const User = db.users;
const Role = db.roles;
const Op = db.Sequelize.Op;

const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

signUp = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }).then(user => {
        if (req.body.roles){
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.status(201).send(`L'utilisation a éte créé avec succès`)
                });
            });
        } else {
            user.setRoles([1]).then(() => {
                res.status(201).send(`L'utilisatreur a été créé avec succès.`)
            });
        }
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
};

signIn = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user){
            return  res.status(401).send(`l'utilisateur ${user.username} n'a pas été trouvé`);
        }
        let passwordIsvalid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsvalid){
            return res.status(403).send({
                accessToken: null,
                message: 'mot de passe non valid'
            });
        }

        let token = jwt.sign({id: user.id}, config.get('jwtPrivateKey'), {expiresIn: 86400 //24 heures
        });

        let authorities = [];
        user.getRoles().then(roles => {
            for (let i=0; i < roles.length; i++){
                authorities.push('ROLE_'+ roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        } );

    }).catch(error => {
        res.status(500).send({message: error.message})
    });
};

module.exports = {
    signUp,
    signIn
}


