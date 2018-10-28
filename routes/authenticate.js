const express = require('express');
const bcrypt = require('bcrypt');
const { executeQuery } = require('./helpers/sqlHelpers');
const router = express.Router();

router.post('/', async (req, res, next) => {
  let user = null;
  try {
    user = (await executeQuery(`SELECT * FROM users WHERE username="${req.body.username}"`))[0];
  } catch (err) {
    console.error(err);
  }

  if (!user) {
    return res.json({ success: false });
  }

  let match = false;
  try {
    match = await bcrypt.compare(req.body.password, user.password);
  } catch (err) {
    console.error(err);
  }

  if (match) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
