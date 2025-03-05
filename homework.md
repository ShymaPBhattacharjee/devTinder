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
- 
