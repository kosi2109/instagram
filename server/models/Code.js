const mongoose = require("mongoose");

const codeSchema  = mongoose.Schema({
    email :{
        type : String,
        required : true
    },
    code : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Codes",codeSchema);