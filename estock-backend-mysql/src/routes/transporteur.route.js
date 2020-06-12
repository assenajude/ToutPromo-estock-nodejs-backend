const express = require('express');
const router = express.Router();
const transportCtrl = require('../controllers/transporteur.controller');

router.post('/', transportCtrl.createTransp);
router.delete('/', transportCtrl.delAllTransport);
router.get('/', transportCtrl.getAllTransport);

module.exports = router