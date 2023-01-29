// const ObjectId = require("mongodb").ObjectId;

const {
  getMusic,
  getMusicItemById,
  addMusicItem,
  changeMusicItem,
  deleteMusicItem,
} = require("../services/musicServices");

// GET
const getMusicController = async (req, res) => {
  const music = await getMusic();
  res.json({ music, status: "success" });
};

// GET by ID
const getMusicItemByIdController = async (req, res) => {
  const { id } = req.params;
  const musicItem = await getMusicItemById(id);
  res.json({ musicItem, status: "success" });
};

// POST
const addMusicItemController = async (req, res) => {
  const { musicName, video, audio, notes } = req.body;

  await addMusicItem({ musicName, archive, video, audio, notes });

  res.json({ status: "success" });
};

// PUT by ID
const changeMusicItemController = async (req, res) => {
  const { id } = req.params;

  const { archive, musicName, video, audio, notes } = req.body;

  await changeMusicItem(id, { archive, musicName, video, audio, notes });

  res.json({ status: "success" });
};

// DELETE by ID
const deleteMusicItemController = async (req, res) => {
  const { id } = req.params;

  await deleteMusicItem(id);

  res.json({ status: "success" });
};

module.exports = {
  getMusicController,
  getMusicItemByIdController,
  addMusicItemController,
  changeMusicItemController,
  deleteMusicItemController,
};
