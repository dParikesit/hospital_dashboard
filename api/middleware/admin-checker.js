module.exports = function (req, res, next) {
  if (req.user.role == "Admin") {
    next();
  } else {
    return res.status(401).json({
      error: "User not authenticated",
    });
  }
};
