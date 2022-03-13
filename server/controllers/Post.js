const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary.config");

const getPosts = async (req, res) => {
  const posts = await Post.find({})
    .populate({ path: "posted_by", select: "userName fullName -_id" })
    .populate({path:"likes.liked_by",select: "userName fullName -_id"})
    .select(["-images.public_id", "-images._id"])
    .sort({ _id: -1 });
  res.status(200).json(posts);
};

const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const date = new Date();
    const folder = `instragam_clone/${req.userId}/${date
      .toLocaleDateString()
      .split("/")
      .join("_")}`;

    let pictureFiles = req.files;

    pictureFiles = await Promise.all(
      pictureFiles.map(async (picture) => {
        let { public_id, url } = await cloudinary.uploader.upload(
          picture.path,
          { folder: folder }
        );
        return { url, public_id };
      })
    );

    const newPost = new Post({
      posted_by: req.userId,
      images: pictureFiles,
      title: caption,
    });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.json(error.message);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("posted_by", [
      "userName",
      "fullName",
    ]).populate({path:"likes.liked_by",select: "userName fullName -_id"});
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ error: "Blog Not Found" });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.body;

  try {
    const post = await Post.findById(postId).populate("posted_by");

    if (req.userId === String(post.posted_by._id)) {
      post.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      });
      await post.delete();
      res.status(200).json({ success: "Post was deleted successfully ." });
    } else {
      res
        .status(401)
        .json({ error: "You are not authenticated to delete this post." });
    }
  } catch (error) {
    console.log(error);
  }
};

const likeControl = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await Post.findById(postId);

    const exist = post.likes.find((e) => e.liked_by == req.userId);

    if (exist) {
      post.likes = post.likes.filter((e)=> e.liked_by != req.userId)
      await post.save();
      return res.status(200).json({ success: "Unliked" });
    }

    post.likes.push({ liked_by: req.userId });
    await post.save();
    return res.status(200).json({ success: "Liked" });
  } catch (error) {
    console.log(error);
  }
};



const commentController = async (req,res)=>{
  const {id , comment } = req.body
  try {
    const post = await Post.findById(id)
    post.comment.push({comment_by:req.userId,comment})
    await post.save()
    res.status(200).json({success : "commented" })
  } catch (error) {
    res.json({error: error.message})
  }
}


module.exports = { getPosts, createPost, getPost, deletePost, likeControl , commentController };
