//Middleware to check if user is an Admin
module.exports = function (req, res, next) {
  if (req.user.role == "Administrator") {
    next();
  } else {
    return res.status(401).json({
      error: "Not an admin!",
    });
  }
};
