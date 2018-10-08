const { executeQuery } = require('../../../helpers/sql-helpers');
const { processDate } = require('../../../helpers/date-helpers');

let getAllPosts = async () => {
  let postsQueryString = `
    SELECT posts.id, users.id AS userId, users.username, posts.content, posts.created_at AS createdAt
    FROM posts LEFT JOIN users
    ON posts.user_id = users.id
    ORDER BY id DESC;
  `;
  let commentsQueryString = `
    SELECT comments.id, comments.user_id AS userId, users.username, comments.post_id AS postId, comments.created_at AS createdAt, comments.content
    FROM comments LEFT JOIN users
    ON comments.user_id = users.id
    ORDER BY id;
  `;
  let posts = [];
  let comments = [];
  try {
    posts = executeQuery(postsQueryString);
    comments = executeQuery(commentsQueryString);
  } catch(err) {
    console.error(err);
  }

  let postsSet = createHashSet(await posts);
  posts = addCommentsToPosts(postsSet, await comments);
  transform(posts);
  return posts;
}

function createHashSet(posts) {
  let postsSet = {};
  posts.forEach(post => {
    postsSet[post.id] = post;
    postsSet[post.id].comments = [];
  });

  return postsSet;
}

function addCommentsToPosts(postsSet, comments) {
  comments.forEach( comment => {
    // This is done to get only the latest comment to the post.
    // This works since comments are ordered by id and id is set to AUTO_INCREMENT.
    postsSet[comment.postId].comments[0] = comment;
  });

  // Convert hashset back into an array.
  let modifiedPosts = [];
  Object.entries(postsSet).forEach( entrySet => {
    modifiedPosts.push(entrySet[1]);
  });

  return modifiedPosts.reverse();
}

// Performs a couple of mutations to fit graphql return value formats.
function transform(posts) {
  posts.forEach(post => {
    // Post data modifications
    post.user = {
      id: post.userId,
      username: post.username
    };
    post.createdAt = processDate(post.createdAt);

    delete post.userId;
    delete post.username;


    // Comment data modifications
    let comment = post.comments[0];
    if (comment === undefined) {
      return;
    }

    comment.user = {
      id: comment.userId,
      username: comment.username
    };
    comment.createdAt = processDate(comment.createdAt);
    // comment.post = post;  // Fits the schema but unnecessary.

    delete comment.userId;
    delete comment.username;
    delete comment.postId;
  });
}

module.exports = getAllPosts;
