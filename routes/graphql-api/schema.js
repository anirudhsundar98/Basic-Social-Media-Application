let { buildSchema } = require('graphql');

/**
 * This schema does not have some features that a complete app would have.
 * For instance, Comment should have a Post field that gives information on its parent post 
 *   However this is unnecessary as the app never fetches comments alone. It always fetches posts and their comments.
 * Similarly, User could have a posts field to represent their posts.
 *   However, user posts are fetched through getPosts to avoid redundant code in the getUser query.
 */
const schemaString = `
  type User {
    id: ID!
    username: String!
  }

  type Post {
    id: ID!
    user: User!
    content: String!
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    id: ID!
    user: User!
    content: String!
    createdAt: String
  }

  type MutationMessage {
    success: Boolean!
    message: String
  }

  type Query {
    getUser(id: ID!): User
    getCurrentUser: User
    getPost(id: ID!): Post
    getPosts(username: String): [Post]
    getSession: Int
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
    ): MutationMessage
    createPost(
      content: String!
    ): MutationMessage
    createComment(
      postId: ID!
      content: String
    ): MutationMessage
  }

  type schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = buildSchema(schemaString);