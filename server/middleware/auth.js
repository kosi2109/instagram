const jwt = require("jsonwebtoken");

const getDecode = async (req, res, next) => {
  if (req.headers.authorization == undefined) {
    next();
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  return jwt.verify(token, process.env.SECRET);
};

const auth = async (req, res, next) => {
  try {
    const decode = await getDecode(req, res, next);
    req.userId = decode?.userId;
    next();
  } catch (error) {
    var err = new Error("Not authorized! Go back!");
    err.status = 401;
    return next(err);
  }
};

const validated = async (req, res, next) => {
  const decode = await getDecode(req, res, next);
  if (decode.status == "Active") {
    req.userId = decode?.userId;
    next();
  } else {
    var err = new Error("Not authorized! Go back!");
    err.status = 401;
    return next(err);
  }
};

module.exports = {auth , validated}
