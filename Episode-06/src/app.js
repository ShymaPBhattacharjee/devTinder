const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signUp", async (req, res) => {
  // Creating a new instance of User model
  const user = new User({
    firstName: "Shyma",
    lastName: "Bhattacharjee",
    email: "bhattacharjeeshyam17@gmail.com",
    password: "Welcome@25",
  });
  try {
    await user.save();
    res.send("User added successfully.");
  } catch(err) {
    res.send(400).send("Error saving the user "+ err.message);
  }
  
});

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
