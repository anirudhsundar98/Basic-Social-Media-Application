function accessableAPICheck(req, res, next) {
  if (
    req.app.get('env') === 'development' ||
    req.url !== '/graphql' ||
    req.session.hasOwnProperty("userID")
  ) {
    return next();
  }

  let validAPIPatterns = [
    /^mutation Create { createUser(.*?) {.*?} }$/
  ];

  let patternInvalid = true;

  for (let pattern in validAPIPatterns) {
    if (req.body.query.match(pattern) !== null) {
      patternInvalid = false;
      break;
    }
  };

  if (patternInvalid) {
    return res.send({ success: false, message: "Unauthorized" });
  }
  next();
}

module.exports = accessableAPICheck;
