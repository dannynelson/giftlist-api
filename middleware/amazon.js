// var request = require('request');

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

    spooky.thenEvaluate(function () {
      // this.fill('form[action="/gp/registry/search"]', { 'field-name': 'danielnelsonguitar@gmail.com' }, false);
      document.getElementsByClassName('a-input-text')[0].value = 'danielnelsonguitar@gmail.com';
      document.getElementsByClassName('a-button-input')[1].click();
      // $('.a-button-input')[1].click();
      // document.querySelector('form[action="/gp/registry/search"]').submit();
    });

    // spooky.click();

    spooky.then(function () {
      // var paths = location.pathname.split('/');
      // var id = paths[paths.length - 1];
      this.emit('hello', 'Title is ' + this.evaluate(function () {
        return document.title;
      }));
      // this.emit('request', id);
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

spooky.on('hello', function (greeting) {
  console.log(greeting);
});

// spooky.on('href', function (log) {
  
//   if (log.space === 'remote') {
//     console.log(log.message.replace(/ \- .*/, ''));
//   }
// });

// spooky.on('request', function (id) {
//   console.log(id);
//   request('http://www.justinscarpetti.com/projects/amazon-wish-lister/api/?id='+id, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(body); // Print the google web page.
//     }
//   });
//   // if (log.space === 'remote') {
//   //   console.log(log.message.replace(/ \- .*/, ''));
//   // }
// });