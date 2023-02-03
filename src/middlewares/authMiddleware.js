const jwt = require("jsonwebtoken");

const { NotAuthorisedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (!token) {
    next(new NotAuthorisedError("please provide token"));
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new NotAuthorisedError("invalid token"));
  }
};

module.exports = { authMiddleware };
