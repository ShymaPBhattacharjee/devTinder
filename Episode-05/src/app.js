const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// get function with userAuth in same requestHandler function
app.get("/getUserData", (req, res) => {
  // We should always write our code in try catch block
  try {
    // Logic for DB call and get user data
    res.send("User Data sent");
  } catch (err) {
    res.status(500).send("Some Error contact support teaM");
  }
});

// Wild card error handling
app.use("/", (err, req, res, next) => {
    if(err) {
        // Log your error 
        res.status(500).send("Something went wrong");
    }
});

app.listen(7777, (req, res) => {
  console.log("Sever has connected to port 7777...");
});
