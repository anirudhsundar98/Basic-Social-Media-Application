function accessableAPICheck(req, res, next) {
  if (
    req.url !== '/graphql' ||
    req.session.hasOwnProperty("userID")
  ) {
    return next();
  }

  // Dev only
  if (req.body.query === undefined) {
    if (req.app.get('env') === 'development') {
      return next();
    } else {
      return res.send({ error: { message: "Undefined Query" } });
    }
  }

  let validAPIPatterns = [
    /^mutation Create { createUser(.*?) {.*?} }$/,
    /^query userExists { userExists\(username: ".*?"\) }$/
  ];

  let patternInvalid = true;

  for (let pattern of validAPIPatterns) {
    if (req.body.query.match(pattern) !== null) {
      patternInvalid = false;
      break;
    }
  };

  if (patternInvalid) {
    console.error("Unauthorized API access.");
    return res.send({error: { message: "Unauthorized API call" }});
  }
  next();
}

module.exports = accessableAPICheck;
