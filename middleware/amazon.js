var Spooky = require('spooky');
var request = require('request');
var _ = require('lodash');

var email = 'christian.monaghan@gmail.com';

var spookyConfig = {
  child: {
    transport: 'http'
  },
  casper: {
    logLevel: 'debug',
    verbose: true
  }
};

// module.exports = function (email, cb) {
  
// }

var spooky = new Spooky(spookyConfig, function (err) {
  if (err) {
    e = new Error('Failed to initialize SpookyJS');
    e.details = err;
    throw e;
  }

  // Start spooky
  // ------------------------------
  spooky.start('http://www.amazon.com/gp/registry/wishlist');

  spooky.thenEvaluate(function (email) {
    document.getElementsByClassName('a-input-text')[0].value = email;
    document.getElementsByClassName('a-button-input')[1].click();
  },{
    email: email
  });

  spooky.then(function () {
    var id = this.evaluate(function () {
      var paths = location.pathname.split('/');
      return paths[paths.length - 1];
    });

    this.emit('id', id);
  });

  spooky.run();
});

// Spooky Logger
// ------------------------------
// spooky.on('console', function (line) {
//   console.log(line);
// });


// Spooky listeners
// ------------------------------
spooky.on('id', function (id) {
  console.log(id);
  request('http://www.justinscarpetti.com/projects/amazon-wish-lister/api/?id='+id, function (error, response, json) {
    if (!error && response.statusCode == 200) {
      json = JSON.parse(json);
      var items = json.filter(function (el, i) {
        return i % 2 === 0;
      });
      console.log(JSON.stringify(items, null, 4));
    }
  });
});

spooky.on('error', function (e, stack) {
  console.error(e);
  if (stack) console.log(stack);
});