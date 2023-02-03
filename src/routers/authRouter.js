const express = require("express");
const router = new express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");
// заменяет try catch в async функциях

const {
  registrationController,
  loginController,
} = require("../controllers/authControllers");

router.post("/registration", asyncWrapper(registrationController));
router.post("/login", asyncWrapper(loginController));

module.exports = { authRouter: router };
