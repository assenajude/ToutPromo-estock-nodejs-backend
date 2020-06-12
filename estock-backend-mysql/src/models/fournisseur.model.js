module.exports = (sequelize, Sequelize) => {
    const Fournisseur = sequelize.define('fournisseur',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
        nomFourn: Sequelize.STRING,
        adresseFourn: Sequelize.STRING,
        numFourn: Sequelize.STRING,
        domaineFourn: Sequelize.STRING
    });
    return Fournisseur;
}