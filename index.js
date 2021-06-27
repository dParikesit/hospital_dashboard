require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");

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

const userRoute = require("./api/routes/user");
app.use(userRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
