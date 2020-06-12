const db = require('../models/index');
const Reservation = db.reservations;
const Fournissseur = db.fournisseurs;
const Gestionnaire = db.gestionnaires;
const Achat = db.achats;
const Op = db.Sequelize.Op;

commande = async (req, res, next) => {
    if (!req.body) return res.status(400).send(`Veillez entrer des données à envoyer`);

    const newAchat ={
        dateAchat: req.body.dateAchat,
        qteAchat: req.body.qteAchat,
        puAchat: req.body.puAchat
    };

try{
    let reserve = await Reservation.findByPk(req.body.reserveId);
    let fournisseur = await Fournissseur.findByPk(req.body.fournisseurId);
    let gestionnaire = await Gestionnaire.findByPk(req.body.gestionnaireId);

   const achat =  await reserve.createAchat(newAchat);
    await fournisseur.addAchat(achat);
    await gestionnaire.addAchat(achat);
    const achats = await reserve.getAchats();
    return res.status(201).send(achats);

} catch (e) {
    next(e);
}

};


module.exports = {
    commande
}