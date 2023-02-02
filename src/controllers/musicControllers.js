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
  const { musicName, archive, video, audio, notes } = req.body;
  const { _id } = req.user;
  console.log("_id", _id);
  await addMusicItem({ musicName, archive, video, audio, notes }, _id);

  res.json({ status: "success" });
};

// PUT by ID
const changeMusicItemController = async (req, res) => {
  const { id: musicId } = req.params;
  const { _id: userId } = req.user;
  const { archive, musicName, video, audio, notes } = req.body;

  await changeMusicItem(musicId, {
    archive,
    musicName,
    video,
    audio,
    notes,
  });

  res.json({ status: "success" });
};

// DELETE by ID
const deleteMusicItemController = async (req, res) => {
  const { id: musicId } = req.params;
  const { _id: userId } = req.user;
  await deleteMusicItem(musicId, userId);

  res.json({ status: "success" });
};

module.exports = {
  getMusicController,
  getMusicItemByIdController,
  addMusicItemController,
  changeMusicItemController,
  deleteMusicItemController,
};
