const User = require("../models/User");
const Post = require("../models/Post");
const Code = require("../models/Code");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const nodemailer = require("../config/nodemailer.config");
const crypto = require("crypto");
const cloudinary = require("../config/cloudinary.config");
const secretkey = process.env.SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) return res.status(401).json({ error: "User Doesn't exist" });

  const checkPassword = await bcrypt.compareSync(password, user.password);

  if (checkPassword) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      secretkey
    );

    return res.status(201).json({
      token,
      userName: user.userName,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      gender: user.gender,
      profile_url : user?.profile?.url
    });
  } else {
    return res.status(401).json({
      error:
        "Sorry, your password was incorrect. Please double-check your password.",
    });
  }
};

const logout = async (req, res) => {
  if (req.userId) {
    jwt.sign(
      {
        userId: req.userId,
      },
      secretkey,
      { expiresIn: 120 }
    );
    return res.json("Log out complete");
  }
};

const getUsersBySearch = async (req, res) => {
  const {keyword} = req.query;
  try {
    const userName = new RegExp(keyword, "i");
    const users = await User.find({userName});
    const exit = users.findIndex((user)=> user._id == req.userId)
    if (exit !== -1){
      users.splice(exit,1)
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  const { username, email, fullName, password, birthday, code } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.errors[0].value });
    }
    const existUser = await User.findOne({
      $or: [{ email: email }, { userName: username }],
    });
    if (existUser) return res.status(409).json({ error: "User already Exist" });

    const checkCodeMail = await Code.findOne({ email });

    if (checkCodeMail.code !== code)
      return res.status(400).json({ error: "Wroung Code" });

    const hashedpsw = bcrypt.hashSync(password, 8);
    const user = new User({
      userName: username,
      email,
      fullName,
      password: hashedpsw,
      birthday,
    });
    await user.save();
    const token = jwt.sign(
      {
        userId: user._id,
      },
      secretkey
    );

    return res.status(201).json({
      token,
      userName: user.userName,
      email: user.email,
      fullName: user.fullName,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const sentCode = async (req, res) => {
  const { username, email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000);
  try {
    const exist = await Code.findOne({ email: email });
    if (exist) {
      await exist.remove();
    }
    const newCode = new Code({ email, code });
    await newCode.save();
    await nodemailer.sendConfirmationEmail(username, email, newCode.code);
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};

const validChecker = async (req, res) => {
  const { username, email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: `${errors.errors[0]?.value} is invalid value .` });
  }
  const existEmail = await User.findOne({ userName: username });

  if (existEmail)
    return res.status(409).json({ error: "Username already Exist" });
  const checkCodeMail = await User.findOne({ email });
  if (checkCodeMail)
    return res.status(409).json({ error: "Email already Exist" });

  return res.status(200).json({ success: true });
};

const passwordResetSent = async (req, res) => {
  const { email } = req.body;

  const exist = await User.findOne({ email: email });
  if (!exist) return res.status(400).json({ error: "User Not exists" });
  const code = Math.floor(100000 + Math.random() * 900000);

  const codeExist = await Code.findOne({ email: email });
  if (codeExist) {
    await codeExist.remove();
  }

  const newCode = new Code({ email, code });
  await newCode.save();
  const token = jwt.sign(
    {
      userId: exist._id,
      code: code,
    },
    secretkey,
    { expiresIn: "1h" }
  );

  nodemailer.sendPasswordCode(exist.username, email, token);
  return res.status(201).json({ success: "Passsword Reset Code sent . " });
};

const passwordResetVerify = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const decode = await jwt.verify(token, secretkey);
  const user = await User.findById(decode?.userId);

  const userCode = await Code.findOne({ email: user.email });
  if (userCode.code != decode?.code) {
    return res.status(409).json({ error: "You Are Not Authenticated ." });
  }

  const hashPassword = await bcrypt.hashSync(password, 8);

  user.password = hashPassword;
  await user.save();
  const updateToken = jwt.sign(
    {
      userId: user._id,
    },
    secretkey
  );

  return res.status(201).json({
    token: updateToken,
    userName: user.userName,
    email: user.email,
    fullName: user.fullName,
  });
};

const getUserProfile = async (req, res) => {
  const { userName } = req.params;
  try {
    let user = await User.findOne({ userName: userName }).select("-password");
    const posts = await Post.find({ posted_by: user?._id }).select(
      "likes comment images"
    );
    res.status(200).json({ user, posts });
  } catch (error) {
    console.log(error);
  }
};

const changeUserInfo = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, req.body,{new:true});
    user.save();
    res
      .status(201)
      .json({
        userName: user.userName,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        gender: user.gender,
      });
  } catch (error) {
    console.log(error);
  }
};


const followControl = async (req, res) => {
  const { userName } = req.body;
  try {
    const user = await User.findById(req.userId);
    const otherUser = await User.findOne({userName})
    const exist = user.followings.includes(otherUser._id);
    
    if (String(user._id) === String(otherUser._id)) { 
      return res.status(401).json({error : "Can't follow yourself"}) 
    }

    if (exist) {
      user.followings = user.followings.filter((e) => {e !== String(otherUser._id)});
      otherUser.followers = otherUser.followers.filter((e) => {e !== String(user._id)});
      await user.save();
      await otherUser.save();
      return res.status(200).json({ success: "Unfollowed" });
    }
    
    otherUser.followers.push(user._id);
    user.followings.push(otherUser._id);
    await otherUser.save();
    await user.save();
    return res.status(200).json({ success: "followed" });
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req,res)=>{
  const {old_password , new_password , comfirm_password} = req.body;
  try {
    if(old_password === "" || new_password === "" || comfirm_password === "" ) return res.json({error : "All Field are required" })
    const user = await User.findById(req.userId)

    const true_password = await bcrypt.compareSync(old_password,user.password)
    if(!true_password) return res.status(401).json({error: "Your old password was entered incorrectly. Please enter it again."})

    if (new_password !== comfirm_password) return res.status(401).json({error: "Please make sure both passwords match."})

    if (old_password === new_password) return res.status(401).json({error: "Create a new password that isn't your current password."})

    user.password = await bcrypt.hashSync(new_password,8)
    user.save()
    return res.status(201).json({success : "Password changed."})
  } catch (error) {
    console.log(error);
  }
}

const uploadProfile = async (req,res)=>{
  try {
    const folder = `instragam_clone/${req.userId}/profile-image`;
    let { public_id, url } =await cloudinary.uploader.upload(
      req.file.path,
      { folder: folder }
    );

    const user = await User.findById(req.userId)
    user.profile = {public_id, url}
    user.save()
    return res.json({success : "Profile Image Changed ."})
  } catch (error) {
    console.log(error);
  }
}


const getFollowers = async (req,res)=>{
  const {userName} = req.params
  try {
    const user = await User.findOne({userName}).select('followers');
    if (!user) res.status(401).json({error : "User Not found"})
    let followers = await User.find({_id: {$in : user.followers}}).select("userName fullName profile.url followers followings").lean()
    followers = await Promise.all(followers.map( async follower =>{
      const posts = await Post.find({posted_by:follower._id}).limit(3).sort('-_id')
      follower.posts = posts
      return follower
    }))
    return res.json({followers:followers})
  } catch (error) {
    console.log(error);
  }
}

const getFollowings = async (req,res)=>{
  const {userName} = req.params
  try {
    const user = await User.findOne({userName}).select('followings')
    if (!user) res.status(401).json({error : "User Not found"})
    let followings = await User.find({_id: {$in : user.followings}}).select("userName fullName profile.url followers followings").lean()
    followings = await Promise.all(followings.map( async following =>{
      const posts = await Post.find({posted_by:following._id}).limit(3).sort('-_id')
      following.posts = posts
      return following
    }))
    return res.json({followings:followings})
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getUsersBySearch,
  createUser,
  login,
  logout,
  sentCode,
  validChecker,
  passwordResetSent,
  passwordResetVerify,
  getUserProfile,
  changeUserInfo,
  followControl,
  changePassword,
  uploadProfile,
  getFollowers,
  getFollowings
};
