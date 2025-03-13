const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");

const express = require("express");

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"

// Get all the pending connection request for the loggedInUser
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA);
        // }).populate("fromUserId", ["firstName", "lastName"]);

        res.json({message: "Data fetched  succesfully", data: connectionRequest});

    } catch(err) {
     res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        // const status = req.params.status;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", USER_SAFE_DATA);

        const data = connectionRequest.map(row => {
            if(row.fromUserId.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({data});

    } catch(err) {
     res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = userRouter;