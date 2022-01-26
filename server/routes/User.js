const express = require("express");
const { getUsers, createUser , login} = require("../controllers/User");
const router  = express.Router()

router.get('/',getUsers);
router.post('/',createUser);
router.post('/login',login);

module.exports = router