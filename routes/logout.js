const express = require('express');
const { noSessionCheck } = require("./middleware/login-middleware");
const root = require('../config').sendFileRoot;
const router = express.Router();

router.delete('/', (req, res, next) => {
  req.session = null;
  res.send({ success: true });
});

module.exports = router;
