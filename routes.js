let express = require('express');
let router = express.Router();

let indexRouter = require('./routes/index');
let signupRouter = require('./routes/signup');
let loginRouter = require('./routes/login');
let logoutRouter = require('./routes/logout');
let graphQLRouter = require('./routes/graphql-api');
let cors = require('./routes/middleware/cors');
let { sessionCheck } = require('./routes/middleware/login-middleware');
let accessableAPICheck = require('./routes/middleware/api-middleware');

router.use(cors);
router.use('/signup', signupRouter);
router.use('/login', loginRouter);

router.use(accessableAPICheck);
router.use('/graphql', graphQLRouter);

router.use(sessionCheck);
router.use('/logout', logoutRouter);
router.use('*', indexRouter);

module.exports = router;
