let { buildSchema } = require('graphql');

const schemaString = `
  type User {
    id: ID,
    username: String
    first_name: String
    last_name: String
    age: Int
  }

  type Query {
    getAllUsers: [User]
  }

  type Mutation {
    mut: String
  }

  type schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = buildSchema(schemaString);