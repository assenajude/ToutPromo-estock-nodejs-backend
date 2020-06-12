module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define('client', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nomClient: {
            type: Sequelize.STRING,
            min: 5,
            max: 255
        },
        contactClient: Sequelize.STRING,
        adresseClient: Sequelize.STRING
    });
    return Client;
}