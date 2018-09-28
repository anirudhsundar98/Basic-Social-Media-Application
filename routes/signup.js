const express = require('express');
const { noSessionCheck } = require("./middleware/login-middleware");
const root = require('./helpers/root');
const router = express.Router();

router.use(noSessionCheck);

router.get('/', function (req, res, next) {
  res.sendFile('signup.html', { root });
});

module.exports = router;
