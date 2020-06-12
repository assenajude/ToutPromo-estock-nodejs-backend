const express = require('express');
const router = express.Router();
const approCtrl = require('../controllers/appro.controller');

router.post('/commande', approCtrl.commande);

module.exports = router;