# god-controller
all hail

routes:

*GET/paintings*

Will return an array of yet unspecified painting objects.

If error, returns:
```js
{
  error: true,
  message: "Not Found"
}
```

*GET/users*

Will return an array of yet unspecified user objects.

If error, returns:
```js
{
  error: true,
  message: "Not Found"
}
```

*GET/transactions*

Will return an array of yet unspecified transaction objects.

If error, returns:
```js
{
  error: true,
  message: "Not Found"
}
```

**POST/signup**
GET/users:email
if (res === {}) {
  POST/users
  .send(req.body)
  .then(
    appRes.send({emailExists: false})
    )
} else {
  appRes.send({emailExists: true})
}

**GET/signin**
GET/users:email
if (res === {}) {
  appRes.send({emailExists: false})
  )
} else {
  appRes.send({emailExists: true})
}


GET/users/:id
GET/users/:id/paintings
POST/paintings
POST/paintings/:id
POST/transactions
POST/users
