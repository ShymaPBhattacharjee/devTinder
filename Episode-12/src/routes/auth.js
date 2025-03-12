const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const express = require("express");

const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        });

        res.send("Logout successful!!!");
  });

module.exports = authRouter;