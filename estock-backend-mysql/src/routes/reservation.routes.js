const express = require('express');
const router = express.Router();
const reserveCtrl = require('../controllers/reservation.controller');

router.post('/', reserveCtrl.createReserve);
router.get('/', reserveCtrl.getAllReserve)

module.exports = router;