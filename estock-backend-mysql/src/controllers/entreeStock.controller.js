//require('express-async-errors');
const sequelize = require('sequelize');
const db = require('../models/index');
const Livraison = db.livraisons;
const User = db.users;
const Transporteur = db.transporteurs;
const Reservation = db.reservations;
const Budget = db.budgets;
const Produit = db.produits;
const Achat = db.achats;
const Stock = db.stocks;
const Lignelivraison = db.lignelivraisons;
const Op = db.Sequelize.Op;


createStock = async (req, res, next) => {
    try {
        const [stock, created]= await Stock.findOrCreate({
            where: {
                libelle: req.body.libelle
            },
            defaults: {
                qteEntree: req.body.qteEntree,
                qteSortie: req.body.qteSortie,
                prixVente: req.body.prixVente
            }
        });
        if (created){
            res.status(200).send(stock);
        } else {
            res.status(400).send(`le stock de libelle ${req.body.libelle} existe deja`)
        }
    } catch (e) {
        if (!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
};

getStockByLibelle = async (req, res, next) => {
    try {
        const newLibelle = req.body.libelle;
        let condition = newLibelle ? {libelle: {[Op.like]: `%${newLibelle}%`}}:null;
        let stocks = await Stock.findAll({
            where: condition
        });
        return res.status(200).send(stocks)
    } catch (e) {
        next(e.message)
    }

}

updateStock = async (req, res, next) => {
    const stockId = req.body.stockId;
    try {
        let stock = await Stock.update ({
            libelle: req.body.libelle,
            qteEntree: req.body.qteEntree,
            qteSortie: req.body.qteSortie,
            prixVente: req.body.prixVente}, {
            where: {id: stockId},
        }, {new: true});
       // await stock.reload();
        return res.status(200).send(stock)
    } catch (e) {
        next(e.message)

    }

};

getListStocks = async (req, res, next) => {
    try{
        const stocks = await Stock.findAll();
        return res.status(200).send(stocks)

    } catch (e) {
        next(e.message)
    }
}


deleteReception  = async (req, res, next) => {
    const stockId = req.params.id;
    const livraisonId = req.body.livraisonId;


    try{
        let stock = await Stock.findByPk(stockId);
        const livraison = await Livraison.findByPk(livraisonId);

        await stock.removeLivraison(livraison);
        return res.status(200).send('Le stock supprimé avec succès')
    }catch (e) {
        next(e)
    }
};

delStock = async (req, res, next) => {
    const idStock = req.params.id;
    try{
        await Stock.destroy({
            where: {id: idStock}
        });
        return res.status(200).send(`Le stock d'id ${idStock} a été supprimé avec succès`)
    } catch (e) {
        next(e.message)
    }

}

reception = async (req, res, next) => {
    if(!req.body) return res.status(400).send('Aucune reception a faire');
    const livraisonId = req.body.livraisonId;
    const transportId = req.body.transporteurId;
    const idUser = req.body.userId;
    const stockId = req.body.stockId;

    try{
        const user = await User.findByPk(idUser);
        const transporteur = await Transporteur.findByPk(transportId);
        const livraison = await Livraison.findByPk(livraisonId);
        //let stock = await Stock.findByPk(stockId);

        let livraisons = await Livraison.findAll( {
            where: {
                id: livraisonId
            },
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
        const produit = livraisons[0].achat.reservation.budget.produit.designProd;

      let [stock, created] = await Stock.findOrCreate({
          where: {libelle: produit},
          defaults: {
              qteEntree: req.body.qteLigneLivr,
          }
      });

        await stock.addLivraison(livraison, {
            through: {
                qteLigneLivr: req.body.qteLigneLivr,
                dateLigneLivr: req.body.dateLigneLivr,
            }});
        const qteDepart = stock.qteDepart;
        await stock.increment(['qteDepart', 'qteEntree'],{by: req.body.qteLigneLivr});
       // await stock.increment('qteEntree', {by: req.body.qteLigneLivr});
        const newStock = await stock.reload();
        const qteFin = newStock.qteDepart;
        await stock.createMouvement({
            libelleMvt: 'entree',
            qteMvtDepart: qteDepart,
            qteMvtReste: qteFin,
            qteMvtEntree: req.body.qteLigneLivr
        });

   /*    await reception.setGestionnaire(gestionnaire);
       await reception.setTransporteur(transporteur);*/
       //const stockLivraisons = await stock.getLivraisons();


        res.status(200).send(newStock);
    }catch (e) {
        if (e.details) {
            next(e.details[0])
        }
    }
};

getAllReception = async (req, res, next) => {
    try {
        const receptions = await Lignelivraison.findAll();
        return res.status(200).send(receptions)
    } catch (e) {
        next(e.message)
    }
}

module.exports = {
    reception,
    getAllReception,
    createStock,
    deleteReception,
    delStock,
    getListStocks,
    updateStock,
    getStockByLibelle
}
