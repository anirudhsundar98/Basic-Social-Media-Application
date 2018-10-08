let { buildSchema } = require('graphql');

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
    post: Post
    content: String!
    createdAt: String
  }

  type MutationMessage {
    success: Boolean!
    message: String
  }

  type Query {
    getPost(id: ID!): Post
    getAllPosts: [Post]
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