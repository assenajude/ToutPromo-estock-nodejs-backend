const db = require('../models/index');
const Gestionnaire = db.gestionnaires;

createGest = async (req, res, next) => {
if (!req.body) return res.status(400).send('Champs vides');
try{
    const [gestionnaire, created] = await Gestionnaire.findOrCreate({
        where: {matricule: req.body.matricule},
        defaults: {
            nomGest: req.body.nom,
            mailGest: req.body.mail,
            contactGest: req.body.contact,
            statusGest: req.body.status,
            poste: req.body.poste
        }
    });

    if (created){
        return res.status(201).send(gestionnaire)
    } else return res.status(400).send(`Le gestionnaire de matricule ${req.body.matricule} existe deja`)

} catch (e) {
    next(e.message)
}
};

getAllGestionnaires = async(req, res, next) => {
    try{
        const gests = await Gestionnaire.findAll({
            where: {}
        });
        res.status(200).send(gests)
    }catch (e) {
        next(e.message)
    }
    
};

delAllGest = async (req, res, next) => {
    try{
        await Gestionnaire.destroy({
            where :{}
        });

        return res.status(200).send('Tous les gestionnaires ont été supprimés avec succès')

    } catch (e) {
        next(e.message)
    }
}

module.exports = {
    createGest,
    getAllGestionnaires,
    delAllGest
}