const express = require('express');
const router = express.Router();
const clientCtrl = require('../controllers/client.controller');

router.post('/', clientCtrl.createClient);
router.get('/', clientCtrl.getClients)

module.exports = router;