const express = require("express");
const router = new express.Router();

const {
  addMusicValidation,
  changeMusicValidation,
} = require("../middlewares/musicValidation");

const { asyncWrapper } = require("../helpers/apiHelpers");
// заменяет try catch в async функциях

const {
  getMusicController,
  getMusicItemByIdController,
  addMusicItemController,
  changeMusicItemController,
  deleteMusicItemController,
} = require("../controllers/musicControllers");

router.get("/", asyncWrapper(getMusicController));
router.get("/:id", asyncWrapper(getMusicItemByIdController));
router.post("/", addMusicValidation, asyncWrapper(addMusicItemController));
router.put(
  "/:id",
  changeMusicValidation,
  asyncWrapper(changeMusicItemController)
);
router.delete("/:id", asyncWrapper(deleteMusicItemController));

module.exports = { musicRouter: router };
