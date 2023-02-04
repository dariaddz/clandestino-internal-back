const { registration, login } = require("../services/authServices");

const registrationController = async (req, res) => {
  const { userName, password } = req.body;

  await registration(userName, password);
  res.json({ status: "success" });
};

const loginController = async (req, res) => {
  const { userName, password } = req.body;

  const token = await login(userName, password);
  res.json({ token });
};

module.exports = { registrationController, loginController };
