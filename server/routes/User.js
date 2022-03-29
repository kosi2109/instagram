const express = require("express");
const {
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
} = require("../controllers/User");
const { body } = require("express-validator");
const router = express.Router();
const { auth, validated } = require("../middleware/auth");
const upload = require("../config/multer");

// follower and following
router.post("/follow-control",auth,followControl);
router.get("/followers/:userName",auth,getFollowers);
router.get("/followings/:userName",auth,getFollowings);

// auth
router.get("/search", getUsersBySearch);
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


router.get("/:userName",auth, getUserProfile);

module.exports = router;
