module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        username: {
            type: Sequelize.STRING,
            min: 5,
            max: 50,
            required: true,
        },
        email: {
            type: Sequelize.STRING,
            isEmail: true,
            required: true
        },
        password: Sequelize.STRING
    });
    return User;
}