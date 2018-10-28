const { createHashSet, addCommentsToPosts, transform } = require('../../../helpers/postQueryHelpers');
const { executeQuery } = require('../../../helpers/sqlHelpers');

let getUser = async (data) => {
  // Check if user exists
  let userQueryString = `SELECT id, username FROM users WHERE username = "${data.username}";`;
  let user = [];
  try {
    user = await executeQuery(userQueryString);
  } catch (err) {
    console.error(err);
  }

  if (user.length === 0) {
    throw new Error("User does not Exist");
  }
  user = user[0];

  // Fetch user posts
  let posts = [];
  let postsQueryString = `
    SELECT posts.id, users.id AS userId, users.username, posts.content, posts.created_at AS createdAt
    FROM posts LEFT JOIN users
    ON posts.user_id = users.id
    WHERE users.username = "${data.username}"
    ORDER BY id DESC;
  `;

  try {
    posts = await executeQuery(postsQueryString);
  } catch (err) {
    console.error(err);
    throw err;
  }

  if (posts.length === 0) {
    return posts;
  }

  let postsSet = createHashSet(posts);
  let postsIds = Object.keys(postsSet).map(Number);

  let comments = [];
  let commentsQueryString = `
    SELECT comments.id, comments.user_id AS userId, users.username, comments.post_id AS postId, comments.created_at AS createdAt, comments.content
    FROM comments LEFT JOIN users
    ON comments.user_id = users.id
    WHERE comments.post_id IN (${ postsIds.join(", ")})
    ORDER BY id;
  `;
  try {
    comments = await executeQuery(commentsQueryString);
  } catch (err) {
    console.error(err);
    throw err;
  }

  posts = addCommentsToPosts(postsSet, comments);
  transform(posts);

  // Match return User format
  return { ...user, posts };
}

module.exports = getUser;
