const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'kosi1999', 
    api_key: '224755967289515', 
    api_secret: '8UWxcHFnDTvHC6dlbxapw9AWxYg',
    secure: true
  });


  module.exports = cloudinary