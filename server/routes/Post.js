const express = require("express");
const { getPosts, createPost , getPost ,deletePost, likeControl , commentController , deleteComment } = require("../controllers/Post");
const router  = express.Router();
const {auth} = require('../middleware/auth')
const upload = require("../config/multer")

router.get('/',auth,getPosts);
router.post('/',auth,upload.array('images'),createPost);
router.get('/show/:id',auth,getPost);
router.post('/delete-post',auth,deletePost);
router.post('/like',auth,likeControl);
router.post('/comment',auth,commentController);
router.post('/comment/delete',auth,deleteComment);

module.exports = router