var express = require('express')
  , cors = require('cors')
  , request = require('superagent')
  , parser = require('body-parser')
  , URL = require('url')
  , _ = require('lodash')
  , app = express()
  , transactions = require('./routes/transactions-routes')

  require('superagent-as-promised')(request);

const clientURL = {
  protocol: 'http',
  host: 'paint-market-client.herokuapp.com'
}

var port = process.env.PORT || 3000

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(cors());
transactions(app)

app.get('/', function(req, res, next){
  res.send('welcome to God')
});


// *** PAINTINGS ROUTES *** //
const paintingsURL = {
  protocol: 'http',
  host: 'paint-market-paintings.herokuapp.com'
}

app.get('/paintings', function(appRequest, appResponse, next){
  var url = URL.format(_.extend(paintingsURL, {pathname: '/v1/paintings'}))
  request.get(url)
    .then(function (res) {
      appResponse.json(res.body)
    })
    .catch(function(err) {
      appResponse.json({error: true, message: err.message})
    })
})

app.post('/paintings', function(appRequest, appResponse, next){
  var url = URL.format(_.extend(paintingsURL, {pathname: '/v1/paintings'}))
  request.post(url)
    .send(appRequest.body)
    .then(function (res) {
      appResponse.json(res.body)
    })
    .catch(function(err) {
      appResponse.json({error: true, message: err.message})
    })
})

// *** USERS ROUTES *** //
const usersURL = {
  protocol: 'http',
  host: 'paint-market-users.herokuapp.com'
}

// RETURN A USER OBJECT WITH EMAIL QUERY
app.get('/users', function(appRequest, appResponse, next){
  var url = URL.format(_.extend(usersURL, {pathname: '/users'}))
  request.get(`${url}${appRequest.query.email}`)
    .then(function (res) {
      if (!res.body.users.length === 0) {
        appResponse.json(res.body)
      } else {
        appResponse.json(false)
      }
    })
    .catch(function(err) {
      appResponse.json({error: true, message: err.message})
    })
})

// REQUEST TO SIGN UP
app.post('/users/signup', function(appRequest, appResponse, next){
  console.log('SIGN IN ATTEMPT')
  var url = URL.format(_.extend(usersURL, {pathname: '/users'}))
  request.get(`${url}${appRequest.body.email}`)
    .then(function (res) {
      if (!res.body.users.length === 0) {
        request.post(url)
          .send(appRequest.body)
          .then(function (res) {
            appResponse.json({user: res.users[0]})
          })
      } else {
        appResponse.json({user: false})
      }
    })
    .catch(function(err) {
      appResponse.json({error: true, message: err.message})
    })
})

// REQUEST TO SIGN IN
app.get('/users/signin', function(appRequest, appResponse, next){
  var url = URL.format(_.extend(usersURL, {pathname: '/users'}))
  request.get(`${url}${appRequest.query.email}`)
    .then(function (res) {
      if (!res.body.users.length === 0) {
          appResponse.json({user: userID})
      } else {
        appResponse.json({user: false})
      }
    })
    .catch(function(err) {
      appResponse.json({error: true, message: err.message})
    })
})

if (require.main === module) {
  app.listen(port, () => {
    console.log('god listening on %s', port)
  })
}

module.exports = app
