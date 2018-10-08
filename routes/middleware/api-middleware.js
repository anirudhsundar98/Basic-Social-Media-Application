function accessableAPICheck(req, res, next) {
  if (
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
    console.error("Unauthorized API access.");
    return res.send({error: { message: "Unauthorized API call" }});
  }
  next();
}

module.exports = accessableAPICheck;
