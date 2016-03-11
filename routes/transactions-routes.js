var express = require('express')
  , request = require('superagent')
  , URL = require('url')
  , Promise = require('bluebird')
  , _ = require('lodash')
  require('superagent-as-promised')(request);

module.exports = function (app) {
  const transactionsURL = {
    protocol: 'http',
    host: 'paint-market-transactions.herokuapp.com'
  }

  const paintingsURL = {
    protocol: 'http',
    host: 'paint-market-paintings.herokuapp.com'
  }

  app.get('/transactions', function(appRequest, appResponse, next){
    var url = URL.format(_.extend(transactionsURL, {pathname: '/v1/transactions'}))
    request.get(url)
      .then(function (res) {
        appResponse.json(res.body)
      })
      .catch(function(err) {
        appResponse.json({error: true, message: err.message})
      })
  })

  app.post('/transactions', function(appRequest, appResponse, next) {
    var usersURL = URL.format(_.extend(transactionsURL, {pathname: '/v1/users'}))
    var buyerID = appRequest.body.buyerID
    var sellerID = appRequest.body.sellerID
    var paintingID = appRequest.body.paintingID
    var paintingPrice = appRequest.body.paintingPrice

    request.get(`${url}/${buyerID}`)
      .then(function (res) {
        var buyerObject = res.body
        if (buyerObject.money > paintingPrice) {
          var newPrice = Number.parseInt(Math.random(0, 100000))
          console.log(newPrice)
          makeTransaction({buyerID, sellerID, paintingID, newPrice}, paintingPrice, function (ownerID, paintingPrice) {
            appResponse.json({message: true})
            // UPDATE USERS MONEY
          })
        } else {
          appResponse.json({message: false})
        }
      })
      .catch(function(err) {
        appResponse.json({error: true, message: 'hi nick'})
      })
    })
  }

function makeTransaction (options, paintingPrice, callback) {
  var paintingsURL = URL.format(_.extend(paintingsURL, {pathname: '/v1/paintings'}))
  var transactionsURL = URL.format(_.extend(transactionsURL, {pathname: '/v1/transactions'}))
  var updates = [
    request.put(`${paintingsURL}/${options.paintingID}`)
      .send({ownerID: options.buyerID, paintingPrice: options.newPrice}),
    request.post(transactionsURL)
      .send({
        buyerID: options.buyerID,
        sellerID: options.sellerID,
        paintingID: options.paintingID,
        paintingPrice: paintingPrice})
  ]

  Promise.all(updates).then(function() {
    callback(options.buyerID, options.newPrice)
  })
}
