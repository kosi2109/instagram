const express = require("express");
const { getPosts, createPost } = require("../controllers/Post");
const router  = express.Router()
const auth = require("../middleware/auth")

router.get('/',auth,getPosts);
router.post('/',auth,createPost);


module.exports = router