// const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../db/userModel");

const { NotAuthorisedError } = require("../helpers/errors");

const registration = async (name, password) => {
  // const { name, password } = req.body;
  const user = new UserModel({
    name,
    password,
  });
  await user.save();
};

const login = async (name, password) => {
  const user = await UserModel.findOne({ name });
  if (!user) {
    throw new NotAuthorisedError(`No user named ${name} found`);
  }

  if (!(await bcryptjs.compare(password, user.password))) {
    throw new NotAuthorisedError("Wrong password");
  }

  const token = jwt.sign(
    { _id: user._id, admin: user.admin },
    process.env.JWT_SECRET
  );

  return token;
};

module.exports = {
  registration,
  login,
};
