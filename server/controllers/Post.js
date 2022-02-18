const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary.config");

const getPosts = async (req, res) => {
  const posts = await Post.find({}).populate("posted_by", [
    "userName",
    "fullName",
  ]).sort('-posted_date');
  res.status(200).json(posts);
};

const createPost = async (req, res) => {
  try {
    const { caption } = req.body;

    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(req.files[i].path);
    }
    const newPost = new Post({
      posted_by: req.userId,
      images: reqFiles,
      title: caption,
    });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.json(error.message);
  }
};

const getPost = async (req,res)=>{
  const {id} = req.params
  try {
    const post = await Post.findById(id).populate("posted_by", [
      "userName",
      "fullName",
    ])
    return res.status(200).json(post)
  } catch (error) {
    return res.status(404).json({error: "Blog Not Found"})
  }
}

module.exports = { getPosts, createPost , getPost };
