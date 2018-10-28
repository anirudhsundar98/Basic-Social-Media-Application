const { createHashSet, addCommentsToPosts, transform } = require('../../../helpers/postQueryHelpers');
const { executeQuery } = require('../../../helpers/sqlHelpers');

// Since this is only a test app, pagination will only be done on the home page and not on the users page.
let getAllPosts = async (data) => {
  let limitClause = (data.limit) ? `LIMIT ${data.limit}` : "";
  let reverseClause = "DESC";
  let whereClause = "";

  if (data.endId) {
    whereClause = `WHERE posts.id < ${data.endId}`;
    if (data.startId) {
      whereClause += ` AND posts.id >= ${data.startId}`;
    }
  } else if(data.startId) {
    whereClause = `WHERE posts.id >= ${data.startId}`;
    reverseClause = "";  // In case someone specifies a startId and a limit but no endId
  }

  let posts = [];
  let postsQueryString = `
    SELECT posts.id, users.id AS userId, users.username, posts.content, posts.created_at AS createdAt
    FROM posts LEFT JOIN users
    ON posts.user_id = users.id
    ${whereClause}
    ORDER BY id ${reverseClause}
    ${limitClause};
  `;

  try {
    posts = await executeQuery(postsQueryString);
  } catch(err) {
    console.error(err);
    throw err;
  }

  if (posts.length === 0) {
    return { startId: -1, posts };
  }

  // All posts should be returned in descending order of creation timestamp
  if (reverseClause === "") {
    posts.reverse();
  }
  let postsSet = createHashSet(posts);
  let postsIds = Object.keys(postsSet).map(Number);

  // Get the least ID from the list of IDs
  let startId;
  if (posts.length < data.limit) {
    startId = -1
  } else {
    startId = postsIds.reduce((result, currentVal) => {
      if (result < currentVal) {
        return result;
      } else {
        return currentVal;
      }
    });
  }

  let comments = [];
  let commentsQueryString = `
    SELECT comments.id, comments.user_id AS userId, users.username, comments.post_id AS postId, comments.created_at AS createdAt, comments.content
    FROM comments LEFT JOIN users
    ON comments.user_id = users.id
    WHERE comments.post_id IN (${ postsIds.join(", ") })
    ORDER BY id;
  `;
  try {
    comments = await executeQuery(commentsQueryString);
  } catch(err) {
    console.error(err);
    throw err;
  }

  posts = addCommentsToPosts(postsSet, comments);
  transform(posts);
  return { startId, posts };
}

module.exports = getAllPosts;
