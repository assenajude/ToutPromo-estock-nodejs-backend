const mainAuth = require('../middleware/mainAuth');
const authCtrl = require('../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.post('/signup', [mainAuth.verifySignUp.checkDupplicateUsernameOrEmail,mainAuth.verifySignUp.checkRolesExisted], authCtrl.signUp);

router.post('/signin', authCtrl.signIn);

module.exports = router;