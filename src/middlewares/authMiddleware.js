const jwt = require("jsonwebtoken");
const { UserModel } = require("../db/userModel");

const { NotAuthorisedError } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new NotAuthorisedError("Not authorized");
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(id);
    if (!user || !user.token) {
      // if (!user) {
      throw new NotAuthorisedError("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }

  // const [tokenType, token] = req.headers["authorization"].split(" ");
  // if (!token) {
  //   next(new NotAuthorisedError("please provide token"));
  // }
  // try {
  //   const user = jwt.decode(token, process.env.JWT_SECRET);
  //   req.token = token;
  //   req.user = user;
  //   next();
  // } catch (err) {
  //   next(new NotAuthorisedError("invalid token"));
  // }
};

module.exports = { authMiddleware };
