const { executeQuery } = require('../../../helpers/sqlHelpers');

let createComment = async (data, req) => {
  const userID = req.session.userID;
  if (userID === null) {
    return {
      success: false,
      message: "Session not set."
    };
  }

  let queryString = `INSERT INTO comments (user_id, post_id, created_at, content) VALUES (${userID}, ${data.postId}, NOW(), "${data.content}");`;
  try {
    await executeQuery(queryString);
  } catch (err) {
    console.error(err);
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

module.exports = createComment;
