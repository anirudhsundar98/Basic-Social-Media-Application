const bcrypt = require('bcrypt');
const { executeQuery } = require('../../../helpers/sql-helpers');

let createUser = async (data) => {
  const saltRounds = 10;
  let err, hash = await bcrypt.hash(data.password, saltRounds);
  if (err) throw err;

  let queryString = `INSERT INTO users (username, password) VALUES ("${data.username}", "${hash}")`;
  try {
    await executeQuery(queryString);
  } catch(error) {
    return {
      success: false,
      message: error.message
    };
  }

  return {
    success: true,
    message: null
  };
}

module.exports = createUser;
