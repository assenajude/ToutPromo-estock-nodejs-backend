const db = require('../models/index');
const Achat = db.achats;
const Reservation = db.reservations;
const Budget = db.budgets;
const Produit = db.produits;
const Categorie = db.categories;
const Centre = db.centres;
const Fournisseur = db.fournisseurs;
const User = db.users;

createAchat = async (req, res, next) => {
    if (!req.body) return res.status(400).send('Veilleez saisir des données à enregistrer')
    const reserveId = req.body.reservationId;
    const fournId = req.body.fournisseurId;
    const idUser = req.body.userId;
    const achat = {
        dateAchat: req.body.dateAchat,
        qteAchat: req.body.qteAchat,
        puAchat: req.body.puAchat
    }
    try{
        let reservation = await Reservation.findByPk(reserveId);
        const fournisseur = await Fournisseur.findByPk(fournId);
        const user = await User.findByPk(idUser);
        let newAchat = await reservation.createAchat(achat);
        await newAchat.setFournisseur(fournisseur);
        await newAchat.setUser(user);
        await reservation.decrement('qteReserve', {by: req.body.qteAchat});
        await reservation.increment('qteConsoReserve', {by: req.body.qteAchat});
        return res.status(201).send(newAchat)
    } catch (e) {
        next(e.message)
    }

};

getAllAchat = async (req, res, next) => {
    try{
        const achats = await Achat.findAll({
            include: {
                model: Reservation,
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
            }
        });
         return res.status(200).send(achats)
    } catch (e) {
        next(e.message)
    }
}

module.exports = {
    createAchat,
    getAllAchat
}