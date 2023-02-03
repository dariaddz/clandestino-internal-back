const { registration, login } = require("../services/authServices");

const registrationController = async (req, res) => {
  const { name, password } = req.body;

  await registration(name, password);
  res.json({ status: "success" });
};

const loginController = async (req, res) => {
  const { name, password } = req.body;

  const token = await login(name, password);
  res.json({ status: "success", token });
};

module.exports = { registrationController, loginController };
