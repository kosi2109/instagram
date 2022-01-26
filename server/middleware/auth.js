const jwt = require("jsonwebtoken")

const auth= async (req,res,next)=>{
    try {
        let decode;
        if (req.headers.authorization == undefined){
            next();
            return
        }
        const token = req.headers.authorization.split(" ")[1]
        decode = jwt.verify(token,"secret")
        req.userId = decode?.userId
        next()
    } catch (error) {
        var err = new Error("Not authorized! Go back!");
        err.status = 401;
        return next(err);
    }
} 

module.exports = auth