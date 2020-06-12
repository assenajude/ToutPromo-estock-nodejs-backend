const mainAuth = require('../middleware/mainAuth');
const userCtrl = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();

router.get('/allUser', userCtrl.allAccess);
router.get('/user', [mainAuth.jwtAuth.verifyToken], userCtrl.userBoard);
router.get('/moderator', [mainAuth.jwtAuth.verifyToken, mainAuth.jwtAuth.isModerator], userCtrl.moderatorBoard);
router.get('/admin', [mainAuth.jwtAuth.verifyToken, mainAuth.jwtAuth.isAdmin], userCtrl.adminBoard);

module.exports = router;