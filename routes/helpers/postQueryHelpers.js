/**
 * Helper methods for the queries that fetch data for multiple posts
 */
const { processDate } = require('./dateHelpers');

function createHashSet(posts) {
  let postsSet = {};
  posts.forEach(post => {
    postsSet[post.id] = post;
    postsSet[post.id].comments = [];
  });

  return postsSet;
}

function addCommentsToPosts(postsSet, comments) {
  comments.forEach(comment => {
    postsSet[comment.postId].comments[0] = comment;
  });

  // Convert hashset back into an array.
  let modifiedPosts = [];
  Object.entries(postsSet).forEach(entrySet => {
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

module.exports = { createHashSet, addCommentsToPosts, transform };
