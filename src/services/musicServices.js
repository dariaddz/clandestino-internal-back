const { MusicModel } = require("../db/musicModel");
const { InvalidParameterError } = require("../helpers/errors");

const getMusic = async ({ skip, limit }) => {
  const music = await MusicModel.find()
    .select({ __v: 0, userId: 0 })
    .skip(skip)
    .limit(limit)
    .sort("musicName");
  return music;
};

const getMusicItemById = async (id) => {
  const musicItem = await MusicModel.findById(id);

  if (!musicItem) {
    throw new InvalidParameterError("error, music item not found");
  }

  return musicItem;
};

const addMusicItem = async (
  { musicName, archive, video, audio, notes },
  userId
) => {
  // console.log("userId", userId);
  const musicItem = new MusicModel({
    musicName,
    archive: false,
    video,
    audio,
    notes,
    userId,
  });

  await musicItem.save();
};

const changeMusicItem = async (
  musicId,
  { archive, musicName, video, audio, notes },
  userId
) => {
  await MusicModel.findOneAndUpdate(
    { _id: musicId, userId },
    {
      $set: { archive, musicName, video, audio, notes },
    }
  );
};

const deleteMusicItem = async (musicId, userId) => {
  await MusicModel.findOneAndRemove({ _id: musicId, userId });
};

module.exports = {
  getMusic,
  getMusicItemById,
  addMusicItem,
  changeMusicItem,
  deleteMusicItem,
};
