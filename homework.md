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

Episode-07 : Diving into API s :

- Difference b/ JSON and javascript objects
- Add the express.json middleware to my app
- Make our /signUp API dynamic to recieve data from the end user
- User.findOne with duplicate email Ids, which object will return.
- API - Get a user by emailId
- API - Feed API - GET/feed - get all the users from the database
- API- Get a user by id 
- Create a delete user API
- Difference between PATCH and PUT http method
- API - Update a user
- Explore the Monggose Documentation for Model methods
- What are options in a Model. findOneAndUpdate method, explore more about it.
- API - Update the user with emailId

- Explore schemaType options from documentation
- add require, minLength, maxLength, min, max, trim
- Add default
- Create a custom validation function for gender
- improve the database schema - put appropiate validations on each field
- Add timestamps to the userSchema
- Add API level validations on Patch request  signUp pos api
- Data sanitization - Add API validation for each field 
-  Install validator
- Explore validator library function for password, email, url