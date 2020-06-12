const categorieRouter = require('../routes/categorie.routes');
const authRouter = require('../routes/auth.routes');
const userRouter = require('../routes/user.routes');
const produitRouter = require('../routes/produit.routes');
const budgetRouter = require('../routes/budget.routes');
const fournisseurRouter = require('../routes/fournisseur.routes');
const achatRouter = require('../routes/achat.routes');
const gestRouter = require('../routes/gestionnaire.routes');
const reserveRouter = require('../routes/reservation.routes');
const livraisonRouter  = require('../routes/livraison.routes');
const centreRouter = require('../routes/centre.routes');
const entreeRouter = require('../routes/entreeStock.routes');
const clientRouter = require('../routes/client.routes');
const venteRouter = require('../routes/vente.routes');
const approRouter = require('../routes/appro.routes');
const transportRouter = require('../routes/transporteur.route');
const mvtRouter = require('../routes/mouvement.routes')

module.exports = function routes(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/test', userRouter);
    app.use('/api/categories', categorieRouter);
    app.use('/api/produits', produitRouter);
    app.use('/api/budgets', budgetRouter);
    app.use('/api/fournisseurs', fournisseurRouter);
    app.use('/api/achats', achatRouter);
    app.use('/api/gestionnaires', gestRouter);
    app.use('/api/reservations', reserveRouter);
    app.use('/api/livraisons', livraisonRouter);
    app.use('/api/centres', centreRouter);
    app.use('/api/entrees', entreeRouter)
    app.use('/api/clients', clientRouter);
    app.use('/api/ventes', venteRouter);
    app.use('/api/appros', approRouter);
    app.use('/api/transporteurs', transportRouter);
    app.use('/api/mouvements', mvtRouter)
    }