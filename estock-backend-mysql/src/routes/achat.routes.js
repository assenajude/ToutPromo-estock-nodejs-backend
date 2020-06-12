const achatCtrl = require('../controllers/achat.controller.js');
const express = require('express');
const router = express.Router();

router.post('/', achatCtrl.createAchat);
router.get('/', achatCtrl.getAllAchat)
/*router.post('/placeOrder', achatCtrl.addAchatToReserve);
router.post('/commande', achatCtrl.createCmd);*/

module.exports = router;