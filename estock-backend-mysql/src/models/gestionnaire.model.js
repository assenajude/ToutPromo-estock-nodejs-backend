module.exports = (sequelize, Sequelize) => {
    const Gestionnaire = sequelize.define('gestionnaire', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        matricule: Sequelize.STRING,
        poste: {
            type: Sequelize.STRING,
            min: 2,
            max: 100
        },
        nomGest: {
            type: Sequelize.STRING,
            min: 5,
            max: 255
        },
        mailGest: {
            type: Sequelize.STRING,
            min: 5,
            max: 50
        },
        contactGest: {
            type: Sequelize.STRING,
            min: 5,
            max: 20
        },
        statusGest: {
            type: Sequelize.STRING,
            min: 5,
            max: 20
        }
    });
    return Gestionnaire;
}