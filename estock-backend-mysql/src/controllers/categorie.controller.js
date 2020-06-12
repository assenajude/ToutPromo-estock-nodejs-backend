const logger = require('../startup/winston-logger');
const db = require('../models/index');
const Categorie = db.categories;
const Produit = db.produits;
const Op = db.Sequelize.Op;
const Centre = db.centres;

createCategorie = async (req, res, next) => {
    try{
        if (!req.body) return res.status(400).send('Il n\'y a pas de donneé a enregistrer');
        const categorie = {
            libelle: req.body.libelle,
            typeCategorie: req.body.typeCategorie
        };
        const newCategorie = await Categorie.create(categorie);
        const centre = await Centre.findByPk(req.body.centreId);
        let centreCategorie = await centre.addCategorie(newCategorie);
        return res.status(201).send(centreCategorie)

    } catch (e) {
        next(e.message)
    }

};

getAllCategorie = async (req, res, next) => {
    try{
        const categories = await Categorie.findAll({
            include: Produit
        });
        return res.status(200).send(categories)

    } catch (e) {
        next(e.message)
    }

};



getAllCategoriesByLibelle = async (req, res, next) => {
    try{
        let libelle = req.query.libelle;
        let condition  = libelle ? {libelle: {[Op.like]: `%${libelle}%`}}: null;

        let categories = await Categorie.findAll({where: condition});
        res.status(200).send(categories);
    } catch (e) {
        next(e.message)
    }


};

getOneCategorie = async (req, res) => {
    const id = req.params.id;
    const categorie = await Categorie.findByPk(id);
    res.status(200).send(categorie);
};
updateOneCategorie = async (req, res) => {
  const id = req.params.id;
  await Categorie.update(req.body, {
      where: {id: id}
  });

  res.status(200).send(`La categorie d'id ${id} a été mise à jour avec succès`)
};
delOneCategorie = async (req, res) => {
    const id = req.params.id;
    await Categorie.destroy({
        where : {id: id}
    });
    res.status(200).send(`La categorie d'id ${id} a été supprimée avec succès`)
};

delAllCategories = async (req, res) => {
    const nums = Categorie.destroy({
        where : {},
        truncate: false
    });

    res.status(200).send(`Toutes les categories ont été supprimézs avec succès`)

};


module.exports = {
    createCategorie,
    getAllCategoriesByLibelle,
    getOneCategorie,
    updateOneCategorie,
    delOneCategorie,
    delAllCategories,
    getAllCategorie
}