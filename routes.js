let express = require('express');
let router = express.Router();

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let graphQLRouter = require('./routes/graphql-api');

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/graphql', graphQLRouter);

module.exports = router;
