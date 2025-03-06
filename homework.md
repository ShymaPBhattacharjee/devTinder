Episode 05 :

- Multiple route handlers
- next()
- Next function and errors along with res.send()
- app.use("/route", rh1, [rh2, rh3], rh5)

- Middlware
- How expressjs basically handlesrequests behind the scene

- diffeence b/w app.use and app.all
- write a dummy auth middleware for admin
- write a dummy auth middleware for all user routes, except /user/login

- error handling using a app.use("/", err, req, res, next)

Episode-06 : Database, Schema  Models Mongoose

- Create a free cluster on MongoDB official site
- Install mongoose library
- Connect your application to the Database <connectionURL>/devTinder
- Call the connectDB function and connect to the database before starting the application on 777
- Create a userSchema & User model
- create a POST /signUp API tp add data to the database
- Push some documents using API calls from postman
- Handling error with try catch
