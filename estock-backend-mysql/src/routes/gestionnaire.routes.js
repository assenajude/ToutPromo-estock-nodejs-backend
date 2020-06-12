const expsress = require('express');
const router = expsress.Router();
const gestCtrl = require('../controllers/gestionnaire.controller');

router.post('/', gestCtrl.createGest );
router.get('/', gestCtrl.getAllGestionnaires);
router.delete('/', gestCtrl.delAllGest)

module.exports = router;