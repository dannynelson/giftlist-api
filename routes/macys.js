var request = require('request');
var qs = require('querystring');

exports.data = function(req, res){
  var path = req.params.path.split('~').join('/') + '?' + qs.stringify(req.query);
  console.log(path);
  var options = {
    url: 'http://api.macys.com/' + path,
    headers: {
      'User-Agent': 'request',
      'X-Macys-Webservice-Client-Id': 'hackathon',
      'Accept': 'application/json'
    }
  };

  var callback = function (error, response, body) {
    res.send(body);
  };

  request(options, callback);
  
};