const bcrypt = require('bcrypt');
const { executeQuery } = require('../../../helpers/sql-helpers');

let updateUser = async (data) => {
  let setString = "";
  if (data.updatedField === "password") {
    if (data.newPassword === undefined) {
      return {
        success: false,
        message: "Password not provided."
      }
    }

    const saltRounds = 10;
    let err = null;
    err, hash = await bcrypt.hash(data.newPassword, saltRounds);
    if (err) throw err;

    setString = `SET password = "${hash}"`;
  } else if (data.updatedField === "username") {
    if (data.newUsername === undefined) {
      return {
        success: false,
        message: "Username not provided."
      }
    }
    setString = `SET username = "${data.newUsername}"`;
  }

  let queryString = `UPDATE users ${setString} WHERE username = "${data.currentUsername}";`;
  try {
    await executeQuery(queryString);
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }

  return {
    success: true,
    message: null
  };
}

module.exports = updateUser;
