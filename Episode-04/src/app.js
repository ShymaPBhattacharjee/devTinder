const express = require("express");

const app = express();

// exploring get, post, delete call
// app.use("/user", (req, res)=> {
//     res.send("Hahaha all the time!");
// });

// app.get("/user", (req, res)=> {
//     res.send("GetUserCall!");
// });

// app.post("/user", (req, res)=> {
//     res.send("PostUserCall!");
// });

// app.delete("/user", (req, res)=> {
//     res.send("DeleteUserCall!");
// });

// Complex routes
// ab?c means : abc and also ac will work.. it means b is optional here
// app.get("/ab?c", (req, res)=> {
//     res.send("GetUserCall!");
// });

// ab+c means : abbbbbbc, abc etc. It means we can add any no of b.
// app.get("/ab+c", (req, res)=> {
//     res.send("GetUserCall!");
// });

// ab*cd means : ab-anything-cd, abcd etc. It means it will start with ab and ens with cd.
// app.get("/ab*cd", (req, res)=> {
//     res.send("GetUserCall!");
// });

// a(bc)?d means : ad, abcd etc. It means bc is optional here.
// app.get("/a(bc)?d", (req, res)=> {
//     res.send("GetUserCall!");
// });

// a(bc)+d means : abcbcbcbcd, abcd etc. It means we can any no of bc here.
// app.get("/a(bc)+d", (req, res)=> {
//     res.send("GetUserCall!");
// });

// /a/ means : Whereever a is come, it will satisfy like cab, ant etc..
// app.get("/a/", (req, res)=> {
//     res.send("GetUserCall!");
// });

// /.*fly$/ means : It can start with anything but at the end will be fly.
// app.get("/.*fly$/", (req, res)=> {
//     res.send("GetUserCall!");
// });

// http://localhost:7777/shyma?101&isSuperStar
app.get("/user", (req, res) => {
    console.log(req.query);  // will give information about the queryParams
    res.send("hello hello hello!")
});

// http://localhost:7777/shyma/7
app.get("/user/:userId", (req, res) => {
    console.log(req.params);
    res.send("hello hello hello!")
});


// Anything that starts with / willl match this expression. So, we need to write it in the end like butterfly, fly.
// app.use("/", (req, res) => {
//     res.send("namaste shyma!");
// });

// Anything that starts with /hello willl match this expression. So, /hello, /hello/2/, hello/anything/ etc. are same
// But, if we write /helloxyz then it will not match. It will match with /hello/xyz.
app.use("/hello", (req, res) => {
    res.send("hello hello hello!")
});

app.use("/test", (req, res) => {
    res.send("hello from the server!")
});

// app.use("/", (req, res) => {
//     res.send("namaste shyma!");
// });

// Order of the execution is impportant.

app.listen(7777, (req, res) => {
    console.log("Sever has connected to port 7777...");
});