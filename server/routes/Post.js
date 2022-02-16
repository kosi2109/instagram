const express = require("express");
const { getPosts, createPost } = require("../controllers/Post");
const router  = express.Router();
const {auth,validated} = require('../middleware/auth')
const upload = require("../config/multer")

router.get('/',auth,getPosts);
router.post('/',auth,upload.array('images'),createPost);


module.exports = router