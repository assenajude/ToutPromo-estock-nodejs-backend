
module.exports = (sequelize, Sequelize) => {
    const Livraison = sequelize.define('livraison', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        dateLivraison: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
           /* set(value) {
                this.setDataValue('dateLivraison', moment(value).format("DD/MM/YYYY"))
            }*/
        },
        qteLivraison: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return Livraison;
}