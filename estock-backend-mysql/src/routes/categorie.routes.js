const express = require('express');
const router = express.Router();
const categorieCtrl = require('../controllers/categorie.controller');

router.get('/byLibelle', categorieCtrl.getAllCategoriesByLibelle);
router.get('/', categorieCtrl.getAllCategorie);
router.post('/', categorieCtrl.createCategorie);
router.put('/:id', categorieCtrl.updateOneCategorie);
router.delete('/', categorieCtrl.delAllCategories);
router.delete('/:id', categorieCtrl.delOneCategorie);

module.exports = router;