const db = require('../models/index');
const Produit = db.produits;
const Categorie = db.categories;
const User = db.users;
const Budget = db.budgets;
const Op = db.Sequelize.Op;


createProduit = async (req, res, next) => {
    const categorieId = req.body.categorieId;


    try{
    let categorie = await Categorie.findByPk(categorieId);
    const centreCategories = await categorie.getCentres();
    const categorieCentre = centreCategories[0].nomCentre;
    let tabCentre = categorieCentre.split(' ');
        let newTab = [];
        let firstLetter = '';
        tabCentre.forEach(tab => {
            if (tab.length > 3) {
                firstLetter = tab[0];
                newTab.push(firstLetter)
            }

        });
        const newCode = newTab.join('');

        const newProduit = {
            designProd: newCode+'-'+req.body.designProd,
            unite: req.body.unite,
            descripProd: req.body.descripProd
        };
        let user = await User.findByPk(req.body.userId);
    if(!categorie) return res.status(404).send(`La categorie ${id} à laquelle vous voulez ajouter le produit n'existe`);
    const produit = await categorie.createProduit(newProduit);
    await produit.setUser(user);
    return res.status(201).send(produit);
    } catch (e) {
        next(e);
    }
};

getAllProduits = async (req, res, next) => {
    try{
        const allProduits = await Produit.findAll();
    res.status(200).send(allProduits)

    } catch (e) {
        next(e)
    }

};
 getProduitByCategorie = async (req, res, next) => {
     try{
         const categorie = await Categorie.findByPk(req.body.categorieId);
         const produits = await categorie.getProduits();
         return res.status(200).send(produits)
     } catch (e) {
         next(e.message)
     }
 };

 deleteProdById = async (req, res, next) => {
     try{
         const id = req.params.id
         const produit = await Produit.findByPk(id);
         if (!produit) return res.status(404).send(`Le produit d'id ${id} n'existe pas`);
         await Produit.destroy({
             where: {id: id}
         });
         return res.status(200).send(`Le produit d'id ${id} a été supprimé avec succès`)

     } catch (e) {
         next(e.message)
     }
 }


module.exports = {
    createProduit,
    getAllProduits,
    getProduitByCategorie,
    deleteProdById
}