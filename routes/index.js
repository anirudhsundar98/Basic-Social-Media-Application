const express = require('express');
const router = express.Router();
const root = require('../config').sendFileRoot;

router.get('/', (req, res, next) => {
  res.sendFile('index.html', { root });
});

module.exports = router;
