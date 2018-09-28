let { buildSchema } = require('graphql');

const schemaString = `
  type User {
    id: ID,
    username: String
  }

  type MutationMessage {
    success: Boolean
    message: String
  }

  type Query {
    getAllUsers: [User]
  }

  type Mutation {
    createUser(
      username: String
      password: String
    ): MutationMessage
  }

  type schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = buildSchema(schemaString);