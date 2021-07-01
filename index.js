require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require('path')
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./api/models/user");

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("DB Connection succeed");
});

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

User.exists({ userName: "admin" }).catch(() => {
  bcrypt.hash("admin", 10, (err, hash) => {
    const newUser = new User({
      firstName: "first",
      lastName: "admin",
      age: 0,
      email: "admin@admin.com",
      userName: "admin",
      password: hash,
      role: "Administrator",
    });
    newUser.save().catch((err)=>{
      console.log(err)
    });
  });
});

const userRoute = require("./api/routes/user");
app.use(userRoute);

const appointmentRoute = require("./api/routes/appointment");
app.use(appointmentRoute);

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build"))); // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
