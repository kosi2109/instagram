const mongoose = require("mongoose")


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
    verified : {
        type : {
            verify_code : {
                type : String,
                unique : true
            },
            status : {
                type : String,
                enum : ['Pending','Active'],
                default : 'Pending'
            },
            verified_at : {
                type : Date
            }
        }
    },
    birthday : {
        type : Date
    },
    password : {
        type : String,
        required : true,
    }
});



module.exports = mongoose.model("Users",userSchema);