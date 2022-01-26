const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    fullName : {
        type : String,
        required : true,
    },
    followers : {
        type : [String],
        default : []
    },
    followings : {
        type : [String],
        default : []
    },
    createdDate : {
        type : Date,
        default : Date.now()
    },
    verifiedAt : {
        type : Date
    },
    birthday : {
        type : Date
    },
    password : {
        type : String,
        required : true,
    }
});

userSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next()
});

module.exports = mongoose.model("Users",userSchema);