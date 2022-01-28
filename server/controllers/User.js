const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const login = async (req,res)=>{
    const {email , password} = req.body
    const user = await User.findOne({email:email})

    if (!user) return res.status(401).json({error: "User Doesn't exist"})

    const checkPassword = await bcrypt.compare(password,user.password)

    if (checkPassword){
        const token = jwt.sign({
            userId : user._id
        },"secret")

        return res.status(201).json({token,userName:user.userName,email:user.email,fullName:user.fullName})
    }else{
        return res.status(401).json({error : "Password Not correct"})
    }

}

const logout = async (req,res)=>{
    
    if (req.userId){
        jwt.sign({
            userId : req.userId
        },"secret",{expiresIn:120})
        return res.json("Log out complete")
    }
}

const getUsers = async (req,res)=>{
    const users = await User.find({})
    return res.status(200).json(users)
}

const createUser = async (req,res)=>{
    const {username,email,fullName,password} = req.body
    
    try {
        const existUser = await User.findOne({$or:[{email:email},{userName:username}]})
        if (existUser) return res.status(409).json({error: "User already Exist"})

        const user = new User({userName:username,email,fullName,password})
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {getUsers,createUser,login,logout}


