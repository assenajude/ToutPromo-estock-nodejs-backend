module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define('budget', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripBudget: {
            type: Sequelize.STRING,
            min: 5,
            max: 255
        },
        qteConsoBudget:  {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        qteBudget:  {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        coutUnitaire: {
          type: Sequelize.INTEGER,
          defaultValue:0
        },
        dateDebutBud: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        dateFinBud: Sequelize.DATE,



    });
    return Budget;
}