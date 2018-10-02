const express = require('express');
const bcrypt = require('bcrypt');
const { noSessionCheck } = require("./middleware/login-middleware");
const root = require('./helpers/root');
const { executeQuery } = require('./helpers/sql-helpers');
const router = express.Router();


router.use(noSessionCheck);

router.get('/', function (req, res, next) {
  res.sendFile('login.html', { root });
});

router.post('/', async function (req, res, next) {
  const user = (await executeQuery(`SELECT * FROM users WHERE username="${req.body.username}"`))[0];
  if (!user) {
    res.json({ success: false });
    return;
  }

  let match = false;
  try {
    match = await bcrypt.compare(req.body.password, user.password);
  } catch(err) {
    throw err;
  }

  if (match) {
    req.session.userID = user.id;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
