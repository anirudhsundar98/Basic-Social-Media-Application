let express = require('express');
let root = require('./helpers/root');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('home.html', { root });
});

module.exports = router;
