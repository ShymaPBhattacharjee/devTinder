const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

const app = express();

// Middleware to convert JSON in Js object and add these JS object back to the req.body for every route handler. So, we are using it here.
app.use(express.json());
app.use(cookieParser());

app.post("/signUp", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Enccrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credintials");
    } else {
      const isPasswordValid = await user.validatePassword(password);

      if (isPasswordValid) { 
        // Create a JWT token
        const token = await user.getJWT();

        // Add the token to ccookie and send the response bak to the user
        // Set expire option in express and set the expiry time as 8 hours after I login 
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000 )
        });
        res.send("Login successfully");
      } else {
        throw new Error("Invalid credintials");
      }
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  const user = req.user;

  res.send(user);
});

app.get("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  // sending connection request
  console.log("sending connection reuest");

  res.send(user.firstName + "sent the connection request!");
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
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
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
