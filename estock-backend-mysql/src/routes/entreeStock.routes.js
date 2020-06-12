const express = require('express');
const router = express.Router();
const entreeCtrl = require('../controllers/entreeStock.controller');

router.post('/reception', entreeCtrl.reception);
router.get('/reception', entreeCtrl.getAllReception);
router.post('/', entreeCtrl.createStock);
router.delete('/reception/:id', entreeCtrl.deleteReception);
router.delete('/stock/:id', entreeCtrl.delStock);
router.get('/', entreeCtrl.getListStocks);
router.patch('/update', entreeCtrl.updateStock);
router.get('/getByLibelle', entreeCtrl.getStockByLibelle)

module.exports = router;