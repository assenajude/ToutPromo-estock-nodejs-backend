const db = require('../models/index')
const Transporteur = db.transporteurs;
const Op = db.Sequelize.Op

createTransp = async (req, res, next) => {
    if(!req.body) return status(400).send('Aucune donnee a ajouter');
    try{
        const [transporteur, created] = await Transporteur.findOrCreate({
            where: {engin: req.body.engin},
            defaults: {
                nomTransport: req.body.nom,
                adTransport: req.body.adresse,
                telTransport: req.body.telephone
            }
        });
        if (created) {
            return res.status(200).send(transporteur)
        } else {
            return res.status(400).send(`Le transporteur ${req.body.engin} existe deja`)
        }
    }catch (e) {
        next(e.message)
    }
};

delAllTransport = async (req, res, next) => {
    try {
        await Transporteur.destroy({
            where: {}
        });
        return res.status(200).send('Tous les enregistrements ont été supprimés avec succès')
    } catch (e) {
        next(e.message)
    }
};

getAllTransport = async (req, res, next) => {
    try{
        const transporteurs = await Transporteur.findAll();
        return res.status(200).send(transporteurs)

    } catch (e) {
        next(e.message)
    }
}

module.exports = {
    createTransp,
    delAllTransport,
    getAllTransport

}