var request = require('request');
var _ = require('lodash');

var email = 'christian.monaghan@gmail.com';

try {
  var Spooky = require('spooky');
} catch (e) {
  var Spooky = require('../lib/spooky');
}

var spooky = new Spooky({
    child: {
      transport: 'http'
    },
    casper: {
      // clientScripts:  ['http://code.jquery.com/jquery-2.1.0.min.js'],
      logLevel: 'debug',
      verbose: true
    }
  }, function (err) {
    if (err) {
      e = new Error('Failed to initialize SpookyJS');
      e.details = err;
      throw e;
    }

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

spooky.on('error', function (e, stack) {
  console.error(e);

  if (stack) {
    console.log(stack);
  }
});

/*
// Uncomment this block to see all of the things Casper has to say.
// There are a lot.
// He has opinions.
spooky.on('console', function (line) {
  console.log(line);
});
*/

// spooky.on('hello', function (greeting) {
//   console.log(greeting);
// });

// spooky.on('href', function (log) {
  
//   if (log.space === 'remote') {
//     console.log(log.message.replace(/ \- .*/, ''));
//   }
// });


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

spooky.on('test', function (test) {
  console.log('TEST: '+test);
});