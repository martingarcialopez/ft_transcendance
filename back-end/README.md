<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
  
<h1 align="center"> BACK-END API SPECIFICATION </h1>

  
<h3 align="center"> http://localhost:3000 </h3>

<h1></h1>

<p align="center">
All the endpoints accepting parameters expect them JSON encoded in the POST body
</p>
<p align="center">
Endpoints expects session token to be in the request headers: "Authorization: Bearer your_token"
</p>
  
</br>

### `POST /user/sign-up`
register a new user in the database

- returns 201 upon successful user creation
 
| _Expected Params_|  _type_       | _required_  |
| :--------------: | :-----------: | :---------: |
| firstname        | string        |  yes        |
| lastname         | string        |  yes        |
| username         | string        |  yes        |
| password         | string        |  yes        |
| avatar           | string        |  no         |




</br>

### `POST /auth/login`
logs in an existing user with valid credentials

- Returns a session token contained in a JSON object

| _Expected Params_|  _type_       | _required_  |
| ---------------- | ------------- | ----------- |
| username         | string        |  yes        |
| password         | string        |  yes        |

code example with curl:
```
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "testuser", "password": "notthesafestpassword"}' -H "Content-Type: application/json"
$ {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlbyIsImlhdCI6MTY1MTYwMTM4NywiZXhwIjoxNjUxNjg3Nzg3fQ.fzsSoSN7umQM1IFtZt-cBYZzf8FGpnodeg03JuEiW7A"}
```
</br>

### `GET /user/current`
- Returns user information of the token owner (the actual logged-in user)

</br>

### `GET /user/:username`
🛡️ PROTECTED ENDPOINT 🛡️ - Valid session token required
- Returns user information of the user with a matching username

</br>

### `POST /user/update/:id`
🛡️ PROTECTED ENDPOINT 🛡️ - Valid session token required

Update user information stocked on the database

- returns 200 upon successful completion

| _Expected Params_|  _type_       | _required_  |
| :--------------: | :-----------: | :---------: |
| firstname        | string        |  no         |
| lastname         | string        |  no         |
| username         | string        |  no         |
| password         | string        |  no         |
| avatar           | string        |  no         |

</br>

### `DELETE /user/:id`
🛡️ PROTECTED ENDPOINT 🛡️ - Valid session token required

Deletes an user of the database

- returns 200 upon successful completion

</br>

### `GET /user/friends`
🛡️ PROTECTED ENDPOINT 🛡️ - Valid session token required
- Returns the friends list of the user owning the token

</br>

### `POST /user/friends/:username`
🛡️ PROTECTED ENDPOINT 🛡️ - Valid session token required
- Adds user with a matching :username to friends list of the user owning the token 

</br>

### `DELETE /user/friends/:username`
🛡️ PROTECTED ENDPOINT 🛡️ - Valid session token required
- Remove user with a matching :username from friends list of the user owning the token

</br>
