const express = require('express');
const router = express.Router();
const mvtCtrl = require('../controllers/mouvement.controller')

router.get('/',mvtCtrl.getAllMvt);

module.exports = router