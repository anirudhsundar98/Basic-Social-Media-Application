let { buildSchema } = require('graphql');

const schemaString = `
  type User {
    id: ID,
    username: String
  }

  type Post {
    id: ID,
    user: User,
    content: String
    createdAt: String
  }

  type MutationMessage {
    success: Boolean
    message: String
  }

  type Query {
    getAllUsers: [User]
    getAllPosts: [Post]
  }

  type Mutation {
    createUser(
      username: String
      password: String
    ): MutationMessage
    createPost(
      content: String
    ): MutationMessage
  }

  type schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = buildSchema(schemaString);