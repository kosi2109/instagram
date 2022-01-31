const express = require("express");
const { getPosts, createPost } = require("../controllers/Post");
const router  = express.Router();
const {validated} = require("../middleware/auth")

router.get('/',getPosts);
router.post('/',createPost);


module.exports = router