const express = require("express");
const router = new express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/apiHelpers");
// заменяет try catch в async функциях

const {
  registrationController,
  loginController,
  logoutController,
} = require("../controllers/authControllers");

router.post("/registration", asyncWrapper(registrationController));
router.post("/login", asyncWrapper(loginController));
router.get("/logout", authMiddleware, asyncWrapper(logoutController));

module.exports = { authRouter: router };
