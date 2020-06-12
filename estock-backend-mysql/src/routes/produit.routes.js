const produitCtrl = require('../controllers/produit.controller');

const express = require('express');
const router = express.Router();


router.post('/', produitCtrl.createProduit);
router.get('/', produitCtrl.getAllProduits);
router.get('/byCategorie', produitCtrl.getProduitByCategorie);
router.delete('/:id', produitCtrl.deleteProdById)

module.exports = router;