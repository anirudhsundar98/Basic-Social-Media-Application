let getSession = async (data, req) => {
  const userID = req.session.userID;
  if (userID === undefined) {
    throw new Error("Not Logged In");
  }

  return userID;
}

module.exports = getSession;
