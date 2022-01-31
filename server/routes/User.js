const express = require("express");
const { getUsers, createUser , login , logout, sentCode , validChecker} = require("../controllers/User");
const { body } = require('express-validator');
const router  = express.Router()
const {auth,validated} = require('../middleware/auth')

router.get('/',getUsers);
router.post('/register',body('email').isEmail(),body('password').isLength({ min: 7 }),createUser);
router.post('/check',body('email').isEmail(),body('password').isLength({ min: 7 }),validChecker);
router.post('/login',login);
router.post('/logout',auth,logout);
router.post('/sendCode',sentCode);
module.exports = router