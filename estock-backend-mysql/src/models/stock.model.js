module.exports = (sequelize, Sequelize) => {
    const Stock = sequelize.define('stock', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        libelle: {
          type: Sequelize.STRING,
          min: 5,
          max: 255
        },
        qteDepart: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        qteEntree: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        qteSortie: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        prixVente: {
            type: Sequelize.INTEGER,
            defaultValue: 5
        }
    });
    return Stock;
}