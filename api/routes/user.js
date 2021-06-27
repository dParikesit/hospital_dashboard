require("dotenv").config();
const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authChecker = require("../middleware/auth-checker");
const adminChecker = require("../middleware/admin-checker");
const User = require("../models/user");

// router.get("/admin/dashboard/:id", adminChecker, (req,res) => {
// });

// User
router.post("/user/register", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    console.log(req.body.password);
    if (err) {
      res.status(500).json({
        message: "Hashing error",
      });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        userName: req.body.userName,
        password: hash,
      });
      newUser
        .save()
        .then((result) => {
          res.status(200).json({
            message: "User saved!",
            result: result
          });
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code == "11000") {
            res.status(409).json({
              message: "User already exists!",
            });
          } else {
            res.status(500).json({
              error: err,
            });
          }
        });
    }
  });
});

router.post("/user/login", (req, res) => {
  User.find({ userName: req.body.userName }).then((user) => {
    if (user.length < 1) {
      res.status(404).json({
        message: "User not found!",
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (result == false) {
        res.status(401).json({
          message: "Password incorrect!",
        });
      }
      const token = jwt.sign(
        {
          userId: user[0]._id,
          role: user[0].role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "3d",
        }
      );
      res
        .cookie("token", token, {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60000),
          httpOnly: true,
          signed: true,
          sameSite: "strict",
          secure: true,
        })
        .status(200)
        .json({
          message: "Login successful",
          role: user[0].role,
        });
    });
  });
});

router.post("/user/logout", authChecker, (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      signed: true,
      secure: true,
    })
    .status(200)
    .json({
      message: "Logout successful",
    });
});

module.exports = router;
