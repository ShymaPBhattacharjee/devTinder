# Devtindewr APIs

### AuthRouter 
    - POST /signUp
    - POST /login
    - POST /logout

### ProfileRouter 
    - GET /profile/view
    - GET /profile/edit
    - GET /profile/password

### ConnectionRequestRouter 
    - POST /request/send/interested/:userId
    - POST /request/send/ignored/:userId
    - POST /request/review/accepted/:userId
    - POST /request/review/rejected/:userId

### UserRouter 
    - GET /user/connections
    - GET /user/requests
    - GET /user/feed : gets the profiles of other users in the platform