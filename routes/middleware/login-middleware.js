function sessionCheck(req, res, next) {
  if (!req.session.userID) {
    res.redirect("/login");
  } else {
    next();
  }
}

function noSessionCheck(req, res, next) {
  if (req.session.userID) {
    res.redirect("/");
  } else {
    next();
  }
}

module.exports = { sessionCheck, noSessionCheck };
