const { executeQuery } = require('../../../helpers/sql-helpers');

let getAllUsers = async () => {
  let queryString = "SELECT * FROM users";
  let users = await executeQuery(queryString);
  return users;
}

module.exports = getAllUsers;
