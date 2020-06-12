module.exports = (sequelize, Sequelize) => {
    const Lignevente = sequelize.define('lignevente', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dateLigneVente: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        qteLigneVente: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        prixVente: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return Lignevente;
}