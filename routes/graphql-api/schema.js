let { buildSchema } = require('graphql');

/**
 * This schema does not have some features that a complete app would have.
 * For instance, Comment should have a Post field that gives information on its parent post .
 * However this is unnecessary as the app never fetches comments alone. It always fetches posts and their comments.
 */
/**
 * It might also seem weird that MutationMessages are being used for failed requests as well
 * rather than just throwing an error.
 * This is a result of incomplete understanding of how graphql functions in the initial stages of the project
 * and too much lazyness to correct it towards the end of the project.
 * As a result, a mutation message is returned for all mutations to maintain homogeneity.
 */
const schemaString = `
  type User {
    id: ID!
    username: String!
    posts: [Post]
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

  type PaginatedPostsData {
    startId: Int
    posts: [Post]
  }

  type Query {
    userExists(username: String!): Boolean
    getCurrentUser: User
    getUser(username: String!): User
    getPost(id: ID!): Post
    getAllPosts(
      startId: Int
      endId: Int
      limit: Int
    ): PaginatedPostsData
    getSession: Int
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
    ): MutationMessage
    updateUser(
      currentUsername: String!
      updatedField: String!
      newUsername: String
      newPassword: String
    ): MutationMessage
    deleteUser(
      userId: Int!
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
