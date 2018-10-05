const express = require('express');
const router = express.Router();
const { executeQuery } = require("./helpers/sql-helpers")

router.get('/', async (req, res, next) => {
  const userID = req.session.userID;
  const queryString = `SELECT id, username FROM users WHERE id=${userID}`;

  let user = null;

  try {
    user = (await executeQuery(queryString))[0];
  } catch (err) {
    console.error(err);
  }

  res.json(user);
});

module.exports = router;
