const db = require('../models/index');
const Centre = db.centres;
const Budget = db.budgets;
const Produit = db.produits;
const Categorie = db.categories;
const Reservation = db.reservations;
const Achat = db.achats;
const Livraison = db.livraisons;
const Stock = db.stocks;
const Vente = db.ventes;

createCentre = async (req, res, next) => {
    try{
        if(!req.body) return res.status(400).send('Aucune donnée à enregistrer. veillez saisir des données ');
        const centreBody = {
            ...req.body
        };
        const newCentre = await Centre.create(centreBody);
        return res.status(201).send(newCentre)

    } catch (e) {
        next(e.message)
    }

};

getAllCentres = async (req, res, next) =>{
    try{
        const centres = await Centre.findAll({
            include: {
                model: Categorie,
                include: {
                    model: Produit,
                    include: {
                        model: Budget,
                        include: {
                            model: Reservation,
                            include: {
                                model: Achat,
                                include: {
                                    model: Livraison,
                                    include: {
                                        model: Stock,
                                        include: Vente
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).send(centres)
    } catch (e) {
        next(e.message)
    }
};


module.exports = {
    createCentre,
    getAllCentres
}