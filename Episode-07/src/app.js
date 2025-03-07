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
  } catch (err) {
    res.status(400).send("Error saving the user " + err.message);
  }
});

// Get a user by ID from the database
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    // const user = await User.find({ emailId: userEmail });
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Error to find the user " + err.message);
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (re, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error to find the user " + err.message);
  }
});

// delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    // const user = await user.findByIdAndDelete({_id: userId});
    const user = await User.findByIdAndDelete(userId);
    console.log(user);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong !!!");
  }
});

// Update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  // console.log(data); 
  // will not update the userId because this is not in our schema. Whichever parameter has in our schema that part will only update.
  try {
    const user = await User.findByIdAndUpdate({_id: userId}, data);
    // console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong !!!");
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
