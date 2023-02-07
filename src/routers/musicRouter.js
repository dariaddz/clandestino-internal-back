const express = require("express");
const router = new express.Router();

const {
  addMusicValidation,
  changeMusicValidation,
} = require("../middlewares/musicValidation");
const { authMiddleware } = require("../middlewares/authMiddleware");

const { asyncWrapper } = require("../helpers/apiHelpers");
// заменяет try catch в async функциях

const {
  getMusicController,
  getMusicItemByIdController,
  addMusicItemController,
  changeMusicItemController,
  deleteMusicItemController,
} = require("../controllers/musicControllers");

// router.use(authMiddleware);

router.get("/", asyncWrapper(getMusicController));
router.get("/:id", asyncWrapper(getMusicItemByIdController));
router.post(
  "/",
  authMiddleware,
  addMusicValidation,
  asyncWrapper(addMusicItemController)
);
router.patch(
  "/:id",
  authMiddleware,
  changeMusicValidation,
  asyncWrapper(changeMusicItemController)
);
router.delete("/:id", authMiddleware, asyncWrapper(deleteMusicItemController));

module.exports = { musicRouter: router };
