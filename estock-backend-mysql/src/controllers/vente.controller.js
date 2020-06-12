const db = require('../models/index');
const Stock = db.stocks;
const Vente = db.ventes;
const User = db.users;
const Client = db.clients;
const Mouvement = db.mouvements;
const Lignevente = db.ligneventes


sortieStock = async (req, res, next) => {
    if (!req.body) return res.status(400).send('Aucun produit à vendre...');
    const idStock = req.body.stockId;
    const idVente = req.body.venteId;
    const idUser = req.body.userId;
    const idClient = req.body.clientId;
    let venteItems = [];
    try{
       // let stock = await Stock.findByPk(idStock);
        const user = await User.findByPk(idUser);
        const client = await Client.findByPk(idClient);
        let vente = await Vente.create({});
        await vente.setUser(user);
        await vente.setClient(client);
         venteItems = req.body.items;

         for(i =0 ; i < venteItems.length; i++) {
             (function (i) {
                 const newItem = venteItems [i];
                 (async function(item) {
                    let stock = await Stock.findByPk(item.id);
                    await vente.addStock(stock, {
                        through: {
                            qteLigneVente: item.quantite,
                            prixVente: item.prixVente
                        }
                    });
                    const qteDepart = stock.qteDepart;
                     await stock.decrement('qteDepart', {by: item.quantite});
                     await stock.increment('qteSortie', {by: item.quantite})
                    const newStock = await stock.reload();
                    const qteFin = newStock.qteDepart;
                    await stock.createMouvement({
                        libelleMvt: 'sortie',
                        qteMvtDepart: qteDepart,
                        qteMvtReste: qteFin,
                        qteMvtSortie: item.quantite
                    })
                })(newItem)
             })(i)
         }
        const ventes = await vente.getStocks();
        return res.status(200).send(ventes)

    } catch (e) {
        next(e)
    }
};
getVenteById = async (req, res, next) => {
    const venteId = req.params.id;
    try{
        let vente = await Vente.findByPk(venteId);
        const stocks = await vente.getStocks();
        return res.status(200).send(stocks)
    } catch (e) {
        next(e.message)
    }
};

getAllVentes = async (req, res, next) => {
    try {
        const ventes = await Vente.findAll({
            include: [Client, Stock]
        });
        return res.status(200).send(ventes)
    } catch (e) {
        next(e.message)
    }
};

getAllLigneventes = async (req, res, next) => {
    try {
        const ligneventes = await Lignevente.findAll({
            order: [
                ['dateLigneVente', 'DESC']
            ]
        })

        return res.status(200).send(ligneventes)

    } catch (e) {
        if (e.details)
        next(e.message.details[0])
    }
}



module.exports = {
    sortieStock,
    getVenteById,
    getAllVentes,
    getAllLigneventes
}