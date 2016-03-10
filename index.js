var express = require('express')
  , cors = require('cors')
  , request = require('superagent')
  , parser = require('body-parser')
  , URL = require('url')
  , _ = require('lodash')
  , bluebird
  , app = express();

  require('superagent-as-promised')(request);

const clientURL = {
  protocol: 'http',
  host: 'paint-market-client.herokuapp.com'
}

var port = process.env.PORT || 3000

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(cors());

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
      appResponse.json(res)
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

app.get('/users', function(appRequest, appResponse, next){
  var url = URL.format(_.extend(paintingsURL, {pathname: '/v1/users'}))
  request.get(url)
    .then(function (res) {
      appResponse.json(res)
    })
    .catch(function(err) {
      appResponse.json({error: true, message: err.message})
    })
})

// *** TRANSACTIONS ROUTES *** //
const transactionsURL = {
  protocol: 'http',
  host: 'paint-market-transactions.herokuapp.com'
}

app.get('/transactions', function(appRequest, appResponse, next){
  var url = URL.format(_.extend(paintingsURL, {pathname: '/v1/transactions'}))
  request.get(url)
    .then(function (res) {
      appResponse.json(res)
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
