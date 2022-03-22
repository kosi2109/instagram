const express = require("express");
const {
  getUsers,
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
  uploadProfile
} = require("../controllers/User");
const { body } = require("express-validator");
const router = express.Router();
const { auth, validated } = require("../middleware/auth");
const upload = require("../config/multer");


// router.get("/", getUsers);

// auth
router.get("/:userName",auth, getUserProfile);
router.post("/register", createUser);
router.post(
  "/check",
  body("email").isEmail(),
  body("password").isLength({ min: 7 }),
  validChecker
);
router.post("/login", login);
router.post("/logout", auth, logout);

// email comfirm
router.post("/sendCode", sentCode);
router.post("/resetCode-sent", passwordResetSent);
router.post("/resetCode-verify/:token", passwordResetVerify);

// edit profile
router.patch("/change/user-info",auth,changeUserInfo);
router.post("/change/password",auth,changePassword);
router.post('/change/profile-image',auth,upload.single('profile'),uploadProfile);

// follower and following
router.post("/follow-control",auth,followControl);



module.exports = router;
