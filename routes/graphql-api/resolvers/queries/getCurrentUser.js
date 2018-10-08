const { executeQuery } = require('../../../helpers/sql-helpers');

let getCurrentUser = async (data, req) => {
  const userID = req.session.userID;
  if (userID === undefined) {
    throw new Error("Not Logged In");
  }


  const queryString = `SELECT id, username FROM users WHERE id=${userID}`;
  let user = null;
  
  try {
    user = (await executeQuery(queryString))[0];
  } catch (err) {
    console.error(err);
  }

  return user;
}

module.exports = getCurrentUser;
