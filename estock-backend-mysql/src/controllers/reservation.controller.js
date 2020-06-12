const db = require('../models/index');
const Reservation = db.reservations;
const Op = db.Sequelize.Op;
const Budget = db.budgets;
const Produit = db.produits;
const Categorie = db.categories;
const Centre = db.centres;
const User = db.users;


createReserve = async (req, res, next) => {
    if(!req.body) return res.status(400).send('Aucune donnee a enregistrer');
    const idUser = req.body.userId;
    const idBudget = req.body.budgetId
    const reserve = {
        dateDebut: req.body.dateDebut,
        dateFin: req.body.dateFin,
        qteReserve: req.body.qteReserve
    };
    try{
        let budget = await Budget.findByPk(idBudget);
        const user = await User.findByPk(idUser);
        if (!budget) return res.status(404).send(`Le budget d'id ${idBudget} n'a pas été trouvé`);
       const newReserve = await budget.createReservation(reserve);
       await newReserve.setUser(user);
       //await budget.decrement('qteBudget', {by: req.body.qteReserve});
       await budget.increment('qteConsoBudget', {by: req.body.qteReserve});
       return res.status(201).send(newReserve)
    } catch (e) {
        next(e)
    }
};

getAllReserve = async (req, res, next) => {
    try{
        let reserves = await Reservation.findAll({
            include: {
                model: Budget,
                include: {
                    model: Produit,
                    include: {
                        model: Categorie,
                        include: Centre
                    }
                }
            }
        });
        if (!reserves) return  res.status(404).send('Aucune reservation trouvée...');

        return res.status(200).send(reserves)
    } catch (e) {
        next(e.message)
    }
}


module.exports = {
    createReserve,
    getAllReserve
}