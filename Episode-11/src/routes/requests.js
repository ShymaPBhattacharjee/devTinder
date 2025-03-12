const { userAuth } = require("../middlewares/auth");


const express = require("express");

const requestRouter = express.Router();

requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
  
    // sending connection request
    console.log("sending connection reuest");
  
    res.send(user.firstName + "sent the connection request!");
  });

module.exports = requestRouter;