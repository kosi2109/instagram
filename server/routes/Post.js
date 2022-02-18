const express = require("express");
const { getPosts, createPost , getPost } = require("../controllers/Post");
const router  = express.Router();
const {auth,validated} = require('../middleware/auth')
const upload = require("../config/multer")

router.get('/',auth,getPosts);
router.get('/:id',auth,getPost);
router.post('/',auth,upload.array('images'),createPost);


module.exports = router