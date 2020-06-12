const db = require('../models/index');
const Role = db.roles;
module.exports = () => {
    Role.create({
        id: 1,
        name: 'user'
    });

    Role.create({
        id: 2,
        name: 'moderator'
    });

    Role.create({
        id:3,
        name: 'admin'
    });
}