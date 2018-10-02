const { executeQuery } = require('../../../helpers/sql-helpers');

let getAllUsers = async () => {
  let queryString = "SELECT * FROM users";
  let users = [];
  try {
    users = await executeQuery(queryString);
  } catch(err) {
    console.log(err);
  }
  return users;
}

module.exports = getAllUsers;
