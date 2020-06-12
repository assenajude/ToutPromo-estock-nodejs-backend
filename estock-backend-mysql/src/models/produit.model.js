module.exports = (sequelize, Sequelize) => {
    const Produit = sequelize.define('produit', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        designProd: {
            type: Sequelize.STRING,
            min: 5,
            max: 255,
            required: true
        },
        unite: {
            type: Sequelize.STRING,
            min: 1,
            max: 15
        },
        descripProd: {
            type: Sequelize.STRING
        }
    });
    return Produit;
}