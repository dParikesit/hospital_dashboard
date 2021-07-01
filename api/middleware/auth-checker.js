require("dotenv").config();
const jwt = require("jsonwebtoken");

//Middleware to check if user is logged In
module.exports = (req, res, next) => {
  const cookie = req.signedCookies;
  try {
    const token = jwt.verify(cookie.token, process.env.JWT_SECRET);
    req.user = token;
    next();
  } catch (error) {
    return res
      .clearCookie("token", {
        httpOnly: true,
        signed: true,
      })
      .status(401)
      .json({
        message: "Auth failed",
        error: error,
      });
  }
};
