const User = require("../models/User");
const Code = require("../models/Code");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const nodemailer = require("../nodemailer.config");
const crypto = require("crypto");
const secretkey = process.env.SECRET


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
    });
  } else {
    return res
      .status(401)
      .json({
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

const getUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
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
    const exist = await Code.findOne({email:email});
    if (exist){
      await exist.remove()
    }
    const newCode = new Code({ email, code });
    await newCode.save();
    await nodemailer.sendConfirmationEmail(username, email, newCode.code);
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};

const validChecker = async (req, res)=>{
  const { username, email } = req.body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: `${errors.errors[0]?.value} is invalid value .` });
  }
  const existEmail = await User.findOne({userName:username});

  if (existEmail) return res.status(409).json({ error: "Username already Exist" });
  const checkCodeMail = await User.findOne({ email });
  if (checkCodeMail) return res.status(409).json({ error: "Email already Exist" });

  return res.status(200).json({success:true})
}

const passwordResetSent = async (req,res)=>{
  const {email} = req.body
  
  const exist = await User.findOne({email:email})
  if (!exist) return res.status(400).json({error : "User Not exists" })
  const code = Math.floor(100000 + Math.random() * 900000);

  const codeExist = await Code.findOne({email:email});
    if (codeExist){
      await codeExist.remove()
    }

  const newCode = new Code({ email, code });
  await newCode.save();
  const token = jwt.sign({
    userId : exist._id,
    code : code
  },secretkey,{expiresIn : "1h"})
  
  nodemailer.sendPasswordCode(exist.username,email,token)
  return res.status(201).json({success : "Passsword Reset Code sent . "})
}

const passwordResetVerify = async (req,res)=>{
  
  const { password } = req.body 
  const {token} = req.params
  const decode = await jwt.verify(token,secretkey)
  const user = await User.findById(decode?.userId)

  const userCode = await Code.findOne({email:user.email})
  if (userCode.code != decode?.code){
    return res.status(409).json({error : "You Are Not Authenticated ."})
  }

  const hashPassword = await bcrypt.hashSync(password,8)

  user.password = hashPassword
  await user.save()
  const updateToken = jwt.sign(
    {
      userId: user._id,
    },
    secretkey
  );

  return res.status(201).json({
    token:updateToken,
    userName: user.userName,
    email: user.email,
    fullName: user.fullName,
  });

}

module.exports = { getUsers, createUser, login, logout, sentCode , validChecker ,passwordResetSent , passwordResetVerify };
