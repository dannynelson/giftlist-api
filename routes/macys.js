var request = require('request');

exports.data = function(req, res){

  var options = {
    url: 'http://api.macys.com/v3/catalog/category/118/browseproducts',
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