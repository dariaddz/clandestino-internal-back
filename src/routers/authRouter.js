const express = require("express");
const router = new express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/apiHelpers");
// заменяет try catch в async функциях

const {
  registrationController,
  loginController,
  currentController,
  logoutController,
} = require("../controllers/authControllers");

router.post("/registration", asyncWrapper(registrationController));
router.post("/login", asyncWrapper(loginController));
router.get("/current", authMiddleware, asyncWrapper(currentController));

router.get("/logout", authMiddleware, asyncWrapper(logoutController));

module.exports = { authRouter: router };
