const express = require('express');
const router = express.Router();
const venteCtrl = require('../controllers/vente.controller');

router.post('/sortie', venteCtrl.sortieStock);
router.get('/:id', venteCtrl.getVenteById);
router.get('/', venteCtrl.getAllVentes);
router.get('/all/lignes', venteCtrl.getAllLigneventes)


module.exports = router;
