const express = require('express');
const { noSessionCheck } = require("./middleware/login-middleware");
const root = require('./helpers/root');
const router = express.Router();

router.delete('/', function (req, res, next) {
  req.session.destroy();
  res.send({ success: true });
});

module.exports = router;
