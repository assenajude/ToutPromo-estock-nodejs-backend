module.exports = (sequelize, Sequelize) => {
    const Centre = sequelize.define('centre', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nomCentre: {
            type: Sequelize.STRING,
            min: 5,
            max: 255
        },
        localCentre: {
            type: Sequelize.STRING,
            min: 5,
            max: 255
        },
        adresseCentre: Sequelize.STRING
    });

    return Centre;
}