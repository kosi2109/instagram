const Post = require("../models/Post")

const getPosts = async (req,res)=>{
    const posts = await Post.find({}).populate('posted_by',['userName','fullName'])
    res.status(200).json(posts)
}

const createPost = async (req,res)=>{
    const {posted_by,images,title} = req.body
    try {
        const newPost = new Post({posted_by,images,title})
        await newPost.save()
        res.json(newPost)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {getPosts,createPost}