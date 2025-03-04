const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("hello!")
});

app.use("/test", (req, res) => {
    res.send("test!")
});

app.listen(7777, (req, res) => {
    console.log("Sever has connected to port 7777...");
});