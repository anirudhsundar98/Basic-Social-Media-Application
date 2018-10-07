const { executeQuery } = require('../../../helpers/sql-helpers');

let getAllPosts = async () => {
  let queryString = `
    SELECT posts.id, users.id as userId, users.username, posts.content, posts.created_at as createdAt
    FROM posts LEFT JOIN users
    ON posts.user_id = users.id
  `;
  let posts = [];
  try {
    posts = await executeQuery(queryString);
  } catch(err) {
    console.error(err);
  }

  transform(posts); // Evil Mutative method
  return posts;
}

function transform(posts) {
  posts.forEach(post => {
    post.user = {
      id: post.userId,
      username: post.username
    };

    let createdAt = new Date(0); // 0 sets the date to the epoch
    createdAt.setUTCMilliseconds(post.createdAt);
    post.createdAt = createdAt.toISOString();

    delete post.userId;
    delete post.username;
  });
}

module.exports = getAllPosts;
