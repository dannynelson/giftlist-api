module.exports = {
  headers: function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
      return res.send(200);
    } else {
      return next();
    }
  }
};
