var express = require('express')
  , cors = require('cors')
  , request = require('superagent')
  , parser = require('body-parser')
  , URL = require('url')
  , _ = require('lodash')
  , bluebird
  , app = express();

  require('superagent-as-promised')(request);

const paintingsURL = {
  protocol: 'http',
  host: 'paint-market-paintings.herokuapp.com'

}
var port = process.env.PORT || 3000

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(cors());

app.get('/', function(req, res, next){
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

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

if (require.main === module) {
  app.listen(port, () => {
    console.log('god listening on %s', port)
  })
}

module.exports = app
