const express = require('express');
const appConfig = require('../config');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect(appConfig.homeUrl);
});

module.exports = router;
