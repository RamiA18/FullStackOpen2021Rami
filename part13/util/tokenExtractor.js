const jwt = require('jsonwebtoken')
const { JWTSECRET } = require('./config')

  const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization");
    if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
      console.log("error occured, token missing/invalid");
      return res.status(401).json({ error: "token invalid/missing" });
    };
  
    req.token = authorization.substring(7)
    const decodedToken = jwt.verify(req.token, JWTSECRET)
    if (!req.token || !decodedToken) {
      console.log("error occured, token missing/invalid");
      return res.status(401).json({ error: "token missing/invalid" })
    };
    req.userId = decodedToken.id
    next();
  };

  module.exports = tokenExtractor 