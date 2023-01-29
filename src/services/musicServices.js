const { MusicModel } = require("../db/musicModel");
const { InvalidParameterError } = require("../helpers/errors");

const getMusic = async () => {
  const music = await MusicModel.find({});
  return music;
};

const getMusicItemById = async (id) => {
  const musicItem = await MusicModel.findById(id);

  if (!musicItem) {
    throw new InvalidParameterError("error, music item not found");
  }

  return musicItem;
};

const addMusicItem = async ({ musicName, archive, video, audio, notes }) => {
  const musicItem = new MusicModel({
    musicName,
    archive: false,
    video,
    audio,
    notes,
  });

  await musicItem.save();
};

const changeMusicItem = async (
  id,
  { archive, musicName, video, audio, notes }
) => {
  await MusicModel.findByIdAndUpdate(id, {
    $set: { archive, musicName, video, audio, notes },
  });
};

const deleteMusicItem = async (id) => {
  await MusicModel.findByIdAndRemove(id);
};

module.exports = {
  getMusic,
  getMusicItemById,
  addMusicItem,
  changeMusicItem,
  deleteMusicItem,
};
