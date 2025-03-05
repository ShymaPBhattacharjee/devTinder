const express = require("express");

const app = express();

//  we can also break it in 2 get method. It is exactly same as previous
// Middleware
app.get("/user", (req, res, next) => {
    console.log("Route handler 1!!!");
    next();
});
// Reuest handler
app.get("/user", (req, res) => {
    console.log("Route handler 2!!!");
    res.send("Response 2!");
});

app.listen(7777, (req, res) => {
    console.log("Sever has connected to port 7777...");
});