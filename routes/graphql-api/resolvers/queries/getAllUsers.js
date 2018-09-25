const executeQuery = require('../../../helper-methods/sql-helpers');

let getAllUsers = () => {
  let queryString = "SELECT * FROM users";
  let users = executeQuery(queryString);
  return users;
}

module.exports = getAllUsers;
