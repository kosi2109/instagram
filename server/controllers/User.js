const User = require("../models/User");
const Code = require("../models/Code");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const nodemailer = require("../nodemailer.config");
const crypto = require("crypto");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) return res.status(401).json({ error: "User Doesn't exist" });

  const checkPassword = await bcrypt.compareSync(password, user.password);

  if (checkPassword) {
    const token = jwt.sign(
      {
        userId: user._id,
        status: user.verified.status,
      },
      "secret"
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
      "secret",
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
      return res.status(400).json({ errors: errors.array() });
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
      verified: { verify_code: code, status: "Active" },
      birthday,
    });
    await user.save();
    const token = jwt.sign(
      {
        userId: user._id,
        status: user.verified.status,
      },
      "secret"
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
    console.log("hit");
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};

const validChecker = async (req, res)=>{
  const { username, email, password } = req.body
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

// const emailComfirm = async (req, res) => {
//   const { token } = req.params;
//   try {
//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ error: "User Not Found" });
//     if (token !== user.verified.verify_code) return res.status(404).json({ error: "Not valid" });
//     user.verified.status = "Active";
//     user.verified.verified_at = Date.now();
//     await user.save();
//     return res.status(200).json({ success: "Email Validation Success" });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

module.exports = { getUsers, createUser, login, logout, sentCode , validChecker };
