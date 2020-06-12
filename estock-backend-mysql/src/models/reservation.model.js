module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define('reservation', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        qteReserve: Sequelize.INTEGER,
        qteConsoReserve: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        dateDebut: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        dateFin: Sequelize.DATE
    });
    return Reservation;
}