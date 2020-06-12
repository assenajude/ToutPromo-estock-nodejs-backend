const db = require('../models/index');
const Budget  = db.budgets;
const Produit = db.produits;
const Centre = db.centres;
const User = db.users;
const Categorie = db.categories;
const Op = db.Sequelize.Op;

 createBudget = async (req, res, next) => {
    if(!req.body) return res.status(400).send('Veillez ajouter des champs dans le formulaire');
    const produitId = req.body.produitId;
    const userId = req.body.userId
    const newBudget = {
        dateDebutBud: req.body.dateDebutBud,
        dateFinBud: req.body.dateFinBud,
        qteBudget: req.body.qteBudget,
        descripBudget: req.body.descripBudget,
        coutUnitaire: req.body.coutUnitaire
    };

    try{
        let produit = await Produit.findByPk(produitId);
        const user = await User.findByPk(userId);
        if(!produit) return res.status(404).send(`le produit ${produitId} n'a pas été trouvé`);
        const budget = await produit.createBudget(newBudget);
        await budget.setUser(user);
        return res.status(201).send(budget);
    }catch (e) {
        next(e);
    }
};

 getBudgetById = async (req, res, next) => {
     const budgetId = req.params.id;
     try{
         let budget = await Budget.findByPk(budgetId, {
             include: {
                 model: Produit,
                 include: {
                     model: Categorie,
                     include: Centre
                 }
             }
         });

     const idCentre = budget.produit.categorie.centres[0].id;
         return res.status(200).send(idCentre)
     } catch (e) {
         next(e.message)
     }
 }

 getAllBudgets = async (req, res, next) => {
     try{
         const budgets  = await Budget.findAll({
             include: {
                 model: Produit,
                 include: {
                     model: Categorie,
                     include: Centre
                 }
             }
         });
         if (!budgets) res.status(404).send('aucun budget trouvé')
         return res.status(200).send(budgets)
     } catch (e) {
         next(e.message)
     }
 };

 getBudgetsByCentre = async (req, res, next) => {
     const idProd= req.body.produitId;
     let budgetsCentre = [];
     try{
   let budgets = await Budget.findAll({
       where: {
           'produitId': {[Op.eq]: idProd}
       },
       include: {
           model: Produit,
           required: true
       },
   });
         return res.status(200).send(budgets)

     } catch (e) {
         next(e.message)
     }
 }

module.exports = {
    createBudget,
    getAllBudgets,
    getBudgetsByCentre,
    getBudgetById
}