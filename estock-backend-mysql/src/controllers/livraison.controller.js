const db = require('../models/index');
const Livraison = db.livraisons;
const Achat = db.achats;
const Reservation = db.reservations;
const Budget = db.budgets;
const Produit = db.produits;
const Transporteur = db.transporteurs;
const User = db.users;
const moment = require('moment');



createLivraison =async (req, res, next) => {
    if(!req.body) return res.status(400).send('Aucune donnée a enregistrer');

    const achatId  = req.body.achatId;
    const idUser = req.body.userId;
    const transportId = req.body.transporteurId;

    const livraison = {
        dateLivraison: req.body.dateLivraison,
        qteLivraison: req.body.qteLivraison
    };

    try{
        let achat = await Achat.findByPk(achatId);
        const user = await User.findByPk(idUser);
        const transporteur = await Transporteur.findByPk(transportId);
        if (!achat) return res.status(404).send(`l'achat d'id ${achatId} n'a pas été trouvé`);
        const newLivraison = await achat.createLivraison(livraison);
        await newLivraison.setUser(user);
        await newLivraison.setTransporteur(transporteur);
        return res.status(201).send(newLivraison)
    } catch (e) {
        next(e)
    }
};

getAllLivraison = async (req, res, next) => {

    try{
        const livraisons = await Livraison.findAll({
            include: {
                model: Achat,
                include: {
                    model: Reservation,
                    include: {
                        model: Budget,
                        include: Produit
                    }
                }
            }

        });
        return res.status(200).send(livraisons)
    } catch (e) {
        next(e.message)
    }

}

module.exports = {
    createLivraison,
    getAllLivraison
}