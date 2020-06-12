module.exports = (sequelize, Sequelize) => {
    const Mouvement = sequelize.define('mouvement', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelleMvt: Sequelize.STRING,
        dateMvt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        qteMvtDepart: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        qteMvtReste: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        qteMvtEntree: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        qteMvtSortie: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },

    })
    return Mouvement
}