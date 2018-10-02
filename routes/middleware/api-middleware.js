function accessableAPICheck(req, res, next) {
  if (req.url !== '/graphql' || req.session.hasOwnProperty("userID")) {
    next();
    return;
  }

  let validAPIPatterns = [
    /^mutation Create { createUser(.*?) {.*?} }$/
  ];

  validAPIPatterns.forEach(pattern => {
    console.log("req.body.query, pattern");
    console.log(req.body.query, pattern);
    if (req.body.query.match(pattern) === null) {
      res.send({ success: false, message: "Unauthorized" });
    }
  });

  next();
}

module.exports = accessableAPICheck;
