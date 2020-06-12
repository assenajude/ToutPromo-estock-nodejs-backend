const express = require('express');
const router = express.Router();

const livraisonCtrl = require('../controllers/livraison.controller');

router.post('/', livraisonCtrl.createLivraison);
router.get('/', livraisonCtrl.getAllLivraison)

module.exports = router;