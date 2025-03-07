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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }
    if(data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10")
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    // console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update failed " + err.message);
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
