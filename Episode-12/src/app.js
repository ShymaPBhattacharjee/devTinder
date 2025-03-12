const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware to convert JSON in Js object and add these JS object back to the req.body for every route handler. So, we are using it here.
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profiles");
const requestRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, (req, res) => {
      console.log("Sever has connected to port 7777...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
