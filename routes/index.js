const express = require('express');
const appConfig = require('../config');
const router = express.Router();

// To do: Handle for production build
router.get('/', (req, res, next) => {
  res.redirect(appConfig.homeUrl + req.originalUrl);
});

module.exports = router;
