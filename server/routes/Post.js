const express = require("express");
const { getPosts, createPost , getPost ,deletePost, likeControl } = require("../controllers/Post");
const router  = express.Router();
const {auth} = require('../middleware/auth')
const upload = require("../config/multer")

router.get('/',auth,getPosts);
router.get('/:id',auth,getPost);
router.post('/',auth,upload.array('images'),createPost);
router.post('/delete-post',auth,deletePost);
router.post('/like',auth,likeControl);

module.exports = router