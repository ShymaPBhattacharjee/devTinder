const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// If we don't write middleware, we need to write authentication, authorization logic to every function. So, we need to write same code again and again like here. 
// To avoid this, we use middlewares
// app.get("/admin/getAllData", (req, res) => {
//     const token = 'xyz';
//     // check the authorization token here
//     const isAdminAuthorized = token === 'xyz';
//     if(isAdminAuthorized) {
//         res.send("All data send");
//     } else {
//         res.status(401).send("Unauthorized request");
//     }
// });

// app.get("/admin/deleteUser", (req, res) => {
//     const token = 'xyzab';
//     // check the authorization token here
//     const isAdminAuthorized = token === 'xyz';
//     if(isAdminAuthorized) {
//         res.send("Deleted a user");
//     } else {
//         res.status(401).send("Unauthorized request");
//     }
// });

// Auth middleware : to handle all request. => we generally use app.use to write middleware beacuse it handle all type of HTTP methods
// Auth middleware
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
    res.send("All data send");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
});

app.get("/user/login",(req, res) => {
    res.send("User logged in successfully.");
}); 

// get function with userAuth in same requestHandler function
app.get("/user", userAuth, (req, res) => {
    res.send("User Data sent");
});

app.listen(7777, (req, res) => {
    console.log("Sever has connected to port 7777...");
});