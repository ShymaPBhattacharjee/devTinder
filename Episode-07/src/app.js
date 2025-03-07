const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// Middleware to convert JSON in Js object and add these JS object back to the req.body for every route handler. So, we are using it here.
app.use(express.json());

app.post("/signUp", async (req, res) => {

  // console.log(req.body); 
  // will print undefined because the data is sent JSON data. So, Server is not able to read that data.
  // To convert it in Js, e need a middleware. That middleware is given by express server i.e express.json()

  // Creating a new instance of User model
  const user = new User(req.body);
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
