module.exports = (sequelize, Sequelize) => {
    const Transporteur = sequelize.define('transporteur', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        nomTransport: {
            type: Sequelize.STRING,
            min: 5,
            max: 255
        },
        engin: {
            type: Sequelize.STRING,
            min: 5,
            max: 255
        },

        adTransport: {
            type: Sequelize.STRING,
            min: 5,
            max: 255
        },
        telTransport: {
            type: Sequelize.STRING,
            min: 5,
            max: 15
        }
    });
    return Transporteur;

}