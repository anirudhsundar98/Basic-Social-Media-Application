const { executeQuery } = require('../../../helpers/sql-helpers');

let userExists = async (data) => {
  let users = [];
  let usersQuery = `SELECT id, username FROM users WHERE username = "${data.username}";`

  try {
    users = await executeQuery(usersQuery);
  } catch (err) {
    console.error(err);
    throw err;
  }

  return (users.length !== 0);
}

module.exports = userExists;
