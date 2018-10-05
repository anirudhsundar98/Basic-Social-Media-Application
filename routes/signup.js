const express = require('express');
const { noSessionCheck } = require("./middleware/login-middleware");
const root = require('../config').sendFileRoot;
const router = express.Router();

router.use(noSessionCheck);

router.get('/', (req, res, next) => {
  res.sendFile('signup.html', { root });
});

module.exports = router;
