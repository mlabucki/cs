const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try{
        token = req.headers.authorization.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).select("-password")
        next();

    }catch(err){
        console.error(err.message);
        res.status(401)
        throw new Error("Not authorized")

    }
  }
  if (!token) {
    res.status(404);
    throw new Error("Not authorized, provide token");
  }
});

module.exports = protect;
