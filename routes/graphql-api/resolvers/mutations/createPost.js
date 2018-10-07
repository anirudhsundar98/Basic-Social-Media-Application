const { executeQuery } = require('../../../helpers/sql-helpers');

let createPost = async (data, req) => {
  const userID = req.session.userID;
  if (userID === null) {
    return {
      success: false,
      message: "Session not set."
    };
  }

  let queryString = `INSERT INTO posts (user_id, created_at, content) VALUES (${userID} , NOW(), "${data.content}");`;
  console.log(queryString);
  try {
    await executeQuery(queryString);
  } catch (err) {
    console.log(err);
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

module.exports = createPost;
