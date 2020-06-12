module.exports = (sequelize, Sequelize) => {
    const Lignelivraison = sequelize.define('lignelivraison', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dateLigneLivr: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        qteLigneLivr: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return Lignelivraison;
}