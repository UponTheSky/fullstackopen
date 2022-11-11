# Token authentication
- the mechanism of token based authentication
- using `jsonwebtoken` library

- generating a token
  - you must have a secret key for generating a new token
  - this key must be hidden from outside

## Limiting creating new notes to logged in users
- validating tokens
- sending tokens:
  - Authorization header + authentication scheme(Bearer scheme)

- validation part is from `~/dream/assntest/urisign` rather than the fullstackopen's sample code
  - using regex

```js
const bearerToken = req.header('authorization');

if (bearerToken) {
  try {
    const token = bearerToken.replace(/^Bearer /, '');
    const decoded = verify(token);
  }
  // ...
```

## Error handling
- when jwt related error occurs
- jwt validation process could be separated as a middleware

## Problems of Token-based authentication
- what if we want to revoke the access rights of the token holder?
  
- limiting the validity period: could be bad for UX
- *server-side session*: saving info about a token to backend db
  - need to access to db, which is costly(slow access to a db)
  - *Redis* could be a solution to this

- *cookie* could be used to transfer the token between the client and the server

## End notes
- usernames, passwords, and token authentication must be used over HTTPS