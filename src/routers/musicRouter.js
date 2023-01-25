const express = require("express");
const router = new express.Router();

const {
  addMusicValidation,
  changeMusicValidation,
} = require("../middlewares/musicValidation");

const modelsMiddleware = require("../middlewares/models");

const { asyncWrapper } = require("../helpers/apiHelpers");
// заменяет try catch в async функциях

const {
  getMusic,
  getMusicItemById,
  addMusicItem,
  changeMusicItem,
  deleteMusicItem,
} = require("../controllers/musicControllers");

router.use(modelsMiddleware);

router.get("/", asyncWrapper(getMusic));
router.get("/:id", asyncWrapper(getMusicItemById));
router.post("/", addMusicValidation, asyncWrapper(addMusicItem));
router.put("/:id", changeMusicValidation, asyncWrapper(changeMusicItem));
router.delete("/:id", asyncWrapper(deleteMusicItem));

module.exports = { musicRouter: router };
