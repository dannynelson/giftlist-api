
/*
 * GET home page.
 */

var amazon = require('../middleware/amazon');

exports.index = function(req, res){
  amazon(req.params.email, function (json) {
    res.json(json);
  });
};