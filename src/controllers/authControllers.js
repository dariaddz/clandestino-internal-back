// const { registration, login } = require("../services/authServices");
// переписать  сервисы
const { Conflict } = require("http-errors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../db/userModel");

// const registrationController = async (req, res) => {
//   const { userName, password } = req.body;

//   await registration(userName, password);
//   res.json({ status: "success" });
// };

// const loginController = async (req, res) => {
//   const { userName, password } = req.body;

//   const token = await login(userName, password);
//   res.json({ token });
// };

const registrationController = async (req, res) => {
  const { userName, password } = req.body;

  const user = await UserModel.findOne({ userName });
  if (user) {
    throw new Conflict(`User named ${userName} already exists`);
  }

  const result = await UserModel.create({ userName, password });
  res.json({ status: "success" });
};

const loginController = async (req, res) => {
  const { userName, password } = req.body;

  const user = await UserModel.findOne({ userName });
  if (!user) {
    throw new NotAuthorisedError(`User named ${userName} not found`);
  }

  const passCompare = bcryptjs.compareSync(password, user.password);
  if (!passCompare) {
    throw new NotAuthorisedError("Wrong password");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });

  await UserModel.findByIdAndUpdate(user._id, { token });
  res.json({ user });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await UserModel.findByIdAndUpdate(_id, { token: null });
  res.json({ status: "logout success" });
};

module.exports = { registrationController, loginController, logoutController };
