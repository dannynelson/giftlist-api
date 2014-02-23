
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/index');
var macys = require('./routes/macys');
var http = require('http');
var path = require('path');
var cors = require('./middleware/cors');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(cors.headers);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/wishlist/:email', routes.index);
app.get('/macys', macys.data);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
