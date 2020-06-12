const express = require('express');
const router = express.Router();
const centreCtrl = require('../controllers/centre.controller');

router.post('/', centreCtrl.createCentre);
router.get('/', centreCtrl.getAllCentres);

module.exports = router;