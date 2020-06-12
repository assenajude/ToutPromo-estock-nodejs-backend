module.exports = (sequelize, Sequelize) => {
    const Categorie = sequelize.define('categorie', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        libelle :{
            type: Sequelize.STRING,
        },
        typeCategorie: {
            type: Sequelize.STRING
        }
    });
    return Categorie;
};