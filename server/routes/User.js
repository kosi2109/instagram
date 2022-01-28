const express = require("express");
const { getUsers, createUser , login , logout} = require("../controllers/User");
const auth = require("../middleware/auth");
const router  = express.Router()

router.get('/',auth,getUsers);
router.post('/register',createUser);
router.post('/login',login);
router.post('/logout',auth,logout);

module.exports = router