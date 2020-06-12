const express = require('express');
const router = express.Router();
const fournCtrl = require('../controllers/fournisseur.controller');

router.post('/', fournCtrl.addFournisseur);
router.get('/', fournCtrl.allFournisseurs)

module.exports = router;