const { executeQuery } = require('../../../helpers/sqlHelpers');

let deleteUser = async (data) => {
  if (!data.userId) {
    return {
      success: false,
      message: "Invalid User Credentials."
    };
  }
  // WHERE comments.post_id IN (${ postsIds.join(", ") })
  let postIdQueryString = `SELECT id FROM posts WHERE user_id = ${data.userId};`
  let postsIds = [];
  try {
    postsIds = await executeQuery(postIdQueryString);
    postsIds = postsIds.map( rowDataPacket => rowDataPacket.id );
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }

  let userCommentDeletionQueryString = `DELETE FROM comments WHERE user_id = ${data.userId};`;
  let postCommentDeletionQueryString = `DELETE FROM comments WHERE post_id IN (${postsIds.join(", ") });`;
  let postDeletionQueryString = `DELETE FROM posts WHERE user_id = ${data.userId};`;
  let userDeletionQueryString = `DELETE FROM users WHERE id = ${data.userId};`;

  try {
    if (postsIds.length > 0) {
      await executeQuery(postCommentDeletionQueryString);
    }
    await executeQuery(userCommentDeletionQueryString);

    await executeQuery(postDeletionQueryString);
    await executeQuery(userDeletionQueryString);
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

module.exports = deleteUser;
