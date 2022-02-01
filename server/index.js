require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

//routes
const userRoute = require("./routes/User")
const postRoute = require("./routes/Post")

app.use("/users",userRoute)
app.use("/posts",postRoute)




const DATABASE = process.env.DATABASE;
const PORT = 8000 | process.env.PORT

mongoose.connect(DATABASE,()=>{
    app.listen(PORT,()=>{
        console.log(`Server listening on ${PORT}`);
    })
})























