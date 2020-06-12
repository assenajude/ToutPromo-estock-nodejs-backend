module.exports = (sequelize, Sequelize) => {
    const Vente = sequelize.define('vente', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dateVente: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });
    return Vente;
}