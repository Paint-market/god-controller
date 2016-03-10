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

GET/users/:id
GET/users/:id/paintings
POST/paintings
POST/paintings/:id
POST/transactions
POST/users
