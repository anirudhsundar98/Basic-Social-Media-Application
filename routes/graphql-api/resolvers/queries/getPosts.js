const { executeQuery } = require('../../../helpers/sql-helpers');
const { processDate } = require('../../../helpers/date-helpers');

let getPosts = async (data) => {
  let postsWhereClause = (data.username) ? `WHERE users.username = "${data.username}"` : "";
  let posts = [];
  let postsQueryString = `
    SELECT posts.id, users.id AS userId, users.username, posts.content, posts.created_at AS createdAt
    FROM posts LEFT JOIN users
    ON posts.user_id = users.id
    ${postsWhereClause}
    ORDER BY id DESC;
  `;
  
  try {
    posts = await executeQuery(postsQueryString);
  } catch(err) {
    console.error(err);
    throw err;
  }

  if (posts.length === 0) {
    return posts;
  }
  
  let postsSet = createHashSet(posts);
  let postsIds = Object.keys(postsSet).map(Number);
  
  let commentsWhereClause = (postsIds.length !== 0) ? `WHERE comments.post_id IN (${postsIds.join(", ")})` : "";
  let comments = [];
  let commentsQueryString = `
    SELECT comments.id, comments.user_id AS userId, users.username, comments.post_id AS postId, comments.created_at AS createdAt, comments.content
    FROM comments LEFT JOIN users
    ON comments.user_id = users.id
    ${commentsWhereClause}
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
    // TODO: Unoptimal. Change Later
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

    delete comment.userId;
    delete comment.username;
    delete comment.postId;
  });
}

module.exports = getPosts;
