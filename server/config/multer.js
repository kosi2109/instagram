const multer = require("multer");
const cloudinary = require('./cloudinary.config')
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({storage});


module.exports = upload