const db = require('../models/index');
const Fournisseur = db.fournisseurs;
const Op = db.Sequelize.Op;

addFournisseur = (req, res) => {
    Fournisseur.create({
        ...req.body
    }).then(fournisseur => {
        res.status(201).send(fournisseur);
    }).catch(error => {
        res.status(400).send(error.message);
    })
};

allFournisseurs = async (req, res, next) => {
    try {
        const fourss = await Fournisseur.findAll()
        return res.status(200).send(fourss)
    } catch (e) {
        next(e.message)
    }
}


module.exports = {
    addFournisseur,
    allFournisseurs
}