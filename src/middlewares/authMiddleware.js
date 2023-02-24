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
};

module.exports = { authMiddleware };
