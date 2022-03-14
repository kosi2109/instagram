const mongoose = require("mongoose");

const postSchema  = mongoose.Schema({
    posted_by :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required:true
    },
    images : {
        type : [{
            url : {
                type : String
            },
            public_id : {
                type : String
            }
        }],
        required : true,
        default : []
    },
    title : {
        type : String,
    },
    posted_date :{
        type : Date,
        default : Date.now()
    },
    likes : {
        type : [
            {
                liked_by : {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Users'
                },
                liked_date : {
                    type : Date,
                    default : Date.now()
                }
            }
        ],
        default : []
    },
    comment : {
        type : [
            {
                comment_by : {
                    type:mongoose.Schema.Types.ObjectId,
                    ref : 'Users'
                },
                comment : {
                    type : String,
                    required : true
                },
                comment_date : {
                    type : Date,
                    default : Date.now()
                }
            }
        ],
        default : []
    }

})

module.exports = mongoose.model("Posts",postSchema);