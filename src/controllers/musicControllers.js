// let music = [
//   {
//     musicName: "hidden Music",
//     archive: true,
//     video: [
//       "https://www.youtube.com/",
//       "https://www.instagram.com/",
//       "https://www.facebook.com/",
//     ],
//     audio: [
//       "https://www.youtube.com/",
//       "https://www.instagram.com/",
//       "https://www.facebook.com/",
//     ],
//     notes: [],
//     id: "1",
//   },
//   {
//     musicName: "Fortunate Son",
//     archive: false,
//     video: ["https://www.instagram.com/", "https://www.facebook.com/"],
//     audio: ["https://www.instagram.com/", "https://www.facebook.com/"],
//     notes: [
//       "https://www.youtube.com/",
//       "https://www.instagram.com/",
//       "https://www.facebook.com/",
//     ],
//     id: "2",
//   },
//   {
//     musicName: "Gimme Some Lovin'",
//     archive: false,
//     video: ["https://www.youtube.com/"],
//     audio: ["https://www.instagram.com/", "https://www.facebook.com/"],
//     notes: [],
//     id: "3",
//   },
// ];
const ObjectId = require("mongodb").ObjectId;
const getMusic = async (req, res) => {
  const music = await req.database.Music.find({}).toArray();

  res.json({ music, status: "success" });
};

const getMusicItemById = async (req, res) => {
  const { id } = req.params;
  const musicItem = await req.database.Music.findOne({ _id: new ObjectId(id) });

  if (!musicItem) {
    return res.status(400).json({ status: "error, music item not found" });
  }

  res.json({ musicItem, status: "success" });
};

const addMusicItem = async (req, res) => {
  const { musicName, video, audio, notes } = req.body;

  await req.database.Music.insert({
    musicName,
    archive: false,
    video,
    audio,
    notes,
  });

  res.json({ status: "success" });
};

// это PUT - не PATCH !!
const changeMusicItem = async (req, res) => {
  const { archive, musicName, video, audio, notes } = req.body;
  await req.database.Music.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { archive, musicName, video, audio, notes } }
  );

  res.json({ status: "success" });
};

// const patchMusicItem = (req, res) => {
//   const { archive, video, audio, notes } = req.body;

//   music.forEach((musicItem) => {
//     if (!musicItem) {
//       return res.status(400).json({ status: "error, music item not found" });
//     }

//     if (musicItem.id === req.params.id) {
//       if (archive) {
//         musicItem.archive = archive;
//       }
//       if (video) {
//         musicItem.video = video;
//       }
//       if (audio) {
//         musicItem.audio = audio;
//       }
//       if (notes) {
//         musicItem.notes = notes;
//       }
//     }
//   });
//   res.json({ status: "success" });
// };

const deleteMusicItem = async (req, res) => {
  await req.database.Music.deleteOne({ _id: new ObjectId(req.params.id) });

  res.json({ status: "success" });
};

module.exports = {
  getMusic,
  getMusicItemById,
  addMusicItem,
  changeMusicItem,

  deleteMusicItem,
};
