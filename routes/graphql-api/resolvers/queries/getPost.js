const { executeQuery } = require('../../../helpers/sql-helpers');
const { processDate } = require('../../../helpers/date-helpers');

let getPost = async (data) => {
  let postsQueryString = `
    SELECT posts.id, posts.user_id AS userId, users.username, posts.content, posts.created_at AS createdAt
    FROM posts LEFT JOIN users
    ON posts.user_id = users.id
    WHERE posts.id = ${data.id};
  `;
  let commentsQueryString = `
    SELECT comments.id, comments.user_id AS userId, users.username, comments.created_at AS createdAt, comments.content
    FROM comments LEFT JOIN users
    ON comments.user_id = users.id
    WHERE comments.post_id = ${data.id}
    ORDER BY id DESC;
  `;
  let post = [];
  let comments = [];
  try {
    post = executeQuery(postsQueryString);
    comments = executeQuery(commentsQueryString);
  } catch (err) {
    console.error(err);
  }

  post = (await post)[0];
  if (post === undefined) {
    throw new Error("Post does not exist");
  }

  addCommentsToPost(post, await comments);
  transform(post);
  return post;
}

function addCommentsToPost(post, comments) {
  post.comments = comments;
}

function transform(post) {
  post.user = {
    id: post.userId,
    username: post.username
  };

  post.createdAt = processDate(post.createdAt);

  delete post.userId;
  delete post.username;

  post.comments.forEach(comment => {
    comment.user = {
      id: comment.userId,
      username: comment.username
    };

    comment.createdAt = processDate(comment.createdAt);
    // comment.post = post;  // Fits the schema but unnecessary.

    delete comment.userId;
    delete comment.username;
  });
}

module.exports = getPost;
