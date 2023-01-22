let music = [
  {
    musicName: "hidden Music",
    archive: true,
    video: [
      "https://www.youtube.com/",
      "https://www.instagram.com/",
      "https://www.facebook.com/",
    ],
    audio: [
      "https://www.youtube.com/",
      "https://www.instagram.com/",
      "https://www.facebook.com/",
    ],
    notes: [],
    id: "1",
  },
  {
    musicName: "Fortunate Son",
    archive: false,
    video: ["https://www.instagram.com/", "https://www.facebook.com/"],
    audio: ["https://www.instagram.com/", "https://www.facebook.com/"],
    notes: [
      "https://www.youtube.com/",
      "https://www.instagram.com/",
      "https://www.facebook.com/",
    ],
    id: "2",
  },
  {
    musicName: "Gimme Some Lovin'",
    archive: false,
    video: ["https://www.youtube.com/"],
    audio: ["https://www.instagram.com/", "https://www.facebook.com/"],
    notes: [],
    id: "3",
  },
];

const getMusic = (req, res) => {
  res.json({ music, status: "success" });
};

const getMusicItemById = (req, res) => {
  const [musicItem] = music.filter((item) => item.id === req.params.id);

  if (!musicItem) {
    return res.status(400).json({ status: "error, music item not found" });
  }

  res.json({ musicItem, status: "success" });
};

const addMusicItem = (req, res) => {
  const { musicName, video, audio, notes } = req.body;

  music.push({
    id: new Date().getTime().toString(),
    archive: false,
    musicName,
    video,
    audio,
    notes,
  });
  res.json({ status: "success" });
};

const changeMusicItem = (req, res) => {
  const { archive, musicName, video, audio, notes } = req.body;
  music.forEach((musicItem) => {
    if (!musicItem) {
      return res.status(400).json({ status: "error, music item not found" });
    }

    if (musicItem.id === req.params.id) {
      musicItem.archive = archive;
      musicItem.musicName = musicName;
      musicItem.video = video;
      musicItem.audio = audio;
      musicItem.notes = notes;
    }
  });
  res.json({ status: "success" });
};

const patchMusicItem = (req, res) => {
  const { archive, video, audio, notes } = req.body;

  music.forEach((musicItem) => {
    if (!musicItem) {
      return res.status(400).json({ status: "error, music item not found" });
    }

    if (musicItem.id === req.params.id) {
      if (archive) {
        musicItem.archive = archive;
      }
      if (video) {
        musicItem.video = video;
      }
      if (audio) {
        musicItem.audio = audio;
      }
      if (notes) {
        musicItem.notes = notes;
      }
    }
  });
  res.json({ status: "success" });
};

const deleteMusicItem = (req, res) => {
  music = music.filter((item) => item.id !== req.params.id);
  res.json({ status: "success" });
};

module.exports = {
  getMusic,
  getMusicItemById,
  addMusicItem,
  changeMusicItem,
  patchMusicItem,
  deleteMusicItem,
};
