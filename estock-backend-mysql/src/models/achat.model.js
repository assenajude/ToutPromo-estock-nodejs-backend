module.exports = (sequelize, Sequelize) => {
    const Achat = sequelize.define('achat', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
        dateAchat: {
          type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        qteAchat: {
          type: Sequelize.INTEGER,
            defaultValue: 0
        },
        puAchat: {
          type: Sequelize.INTEGER,
            defaultValue: 0
        }

    });
    return Achat;
}