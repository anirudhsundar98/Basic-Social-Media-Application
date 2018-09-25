let express = require('express');
let router = express.Router();
let graphqlHTTP = require('express-graphql');

const schema = require('./schema');
const resolvers = require("./resolvers");

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

module.exports = router;
