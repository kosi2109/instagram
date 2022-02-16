const multer = require("multer");
const cloudinary = require('./cloudinary.config')
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "instragam_clone",
    },
  });

const upload = multer({storage});


module.exports = upload