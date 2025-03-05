const express = require("express");

const app = express();

//  can handle GET, POST, DELETE
// app.use("/user", (req, res) => {
    // Route handler function
    
    // res.send("Route handler 1");
    // if we don't write this res.send function, the req will be send but no response will ome and after sometime error timeout error will throw
// });

// function with multiple route handler 
// will return 1st response
// app.use("/user", (req, res) => {
//     console.log("Handling the route user 1!!!")
//     res.send("Route handler 1");
// },
// (req, res) => {
//     console.log("Handling the route user 2!!!");
//     res.send("Route handler 2");
// });

// the req will be send but no response will ome and after sometime error timeout error will throw because there is no res.send and also there is no next function
// app.use("/user", (req, res) => {
//     console.log("Handling the route user 1!!!");
// },
// (req, res) => {
//     console.log("Handling the route user 2!!!");
//     res.send("Route handler 2");
// });

// Now, as there is next function, so it will vo to 2nd route handler and print the 2nd response
// app.use("/user", (req, res, next) => {
//     console.log("Handling the route user 1!!!");
//     next();
// },
// (req, res) => {
//     console.log("Handling the route user 2!!!");
//     res.send("Route handler 2");
// });

// Wheneever we req with /user, the route handler goes to 1st route handler. Then, it give response back as "Route handler 1". 
// But after then there is next(), so it will go and execute 2nd route handler but as response is already gone and the TCP(http) connection is closed. So, it will throw error as : "Cannot set headers after they are sent to the client"
// app.use("/user", (req, res, next) => {
//     console.log("Handling the route user 1!!!");
//     res.send("Route handler 1");
//     next();
// },
// (req, res) => {
//     console.log("Handling the route user 2!!!");
//     res.send("Route handler 2");
// });

// Wheneever we req with /user, the route handler goes to 1st route handler. Thenthere is next() so it will go to 2nd handler and response back as "Route handler 2". 
// But after then there is res.send in the 1st route handler, so it will execute 1st route handler but as response is already gone and the TCP(http) connection is closed. So, it will throw error as : "Cannot set headers after they are sent to the client"
// app.use("/user", (req, res, next) => {
//     console.log("Handling the route user 1!!!");
//     next();
//     res.send("Route handler 1");
// },
// (req, res) => {
//     console.log("Handling the route user 2!!!");
//     res.send("Route handler 2");
// });

// will print  all the consol.log but after then it will give as error : "Cannot GET /user"
// Because as there is next() at the last route handler, the express thought there must be a route handler after it but it's unable to find it. So it is giving error.
// app.use("/user", (req, res, next) => {
//     console.log("Handling the route user 1!!!");
//     next();
// },
// (req, res, next) => {
//     console.log("Handling the route user 2!!!");
//     next();
// });

// We can use all route handler as a array of function
app.use("/user", [(req, res, next) => {
    console.log("Handling the route user 1!!!");
    next();
},
(req, res) => {
    console.log("Handling the route user 2!!!");
    res.send("Route handler 2");
}]);

app.listen(7777, (req, res) => {
    console.log("Sever has connected to port 7777...");
});