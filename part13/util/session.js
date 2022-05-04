const Session = require("./../models/session");
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("./config");

const getTokenFrom = async (req, res, next) => {
  const authorization = req.get("authorization");
  req.token = null;
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Authorization failed/Unauthorized" });
  } else {
    const token = authorization.substring(7);
    const activeSession = await ActiveSession.findOne({ token });
    if (activeSession) {
      req.token = token;
    } else {
      return res.status(401).json({ error: "token invalid" });
    }
  }
  next();
};

module.exports = { getTokenFrom };
