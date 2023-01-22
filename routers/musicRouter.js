const express = require("express");
const router = express.Router();
const Joi = require("joi");

// список всех композиций

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

// GET /api/music   = [...music]
router.get("/", (req, res) => {
  res.json({ music, status: "success" });
});

// GET /api/music/<6178653131>   = {musicItem with id=6178653131}
router.get("/:id", (req, res) => {
  const [musicItem] = music.filter((item) => item.id === req.params.id);

  if (!musicItem) {
    return res.status(400).json({ status: "error, music item not found" });
  }

  res.json({ musicItem, status: "success" });
});

// POST /api/music/   = {newMusicItem, ...music}
router.post("/", (req, res) => {
  const schema = Joi.object({
    archive: Joi.boolean().required(),
    musicName: Joi.string().alphanum().min(3).max(30).required(),
    video: Joi.array().items(Joi.string()).required(),
    audio: Joi.array().items(Joi.string()).required(),
    notes: Joi.array().items(Joi.string()).required(),
  });

  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    return res.status(400).json({ status: validationRes.error.details });
  }

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
});

// PUT /api/music/<6178653131>   = {changedwMusicItem, ...music}
router.put("/:id", (req, res) => {
  const schema = Joi.object({
    musicName: Joi.string().alphanum().min(3).max(30).required(),
    video: Joi.array().items(Joi.string()).required(),
    audio: Joi.array().items(Joi.string()).required(),
    notes: Joi.array().items(Joi.string()).required(),
  });

  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    return res.status(400).json({ status: validationRes.error.details });
  }
  const { musicName, video, audio, notes } = req.body;
  music.forEach((musicItem) => {
    if (musicItem.id === req.params.id) {
      musicItem.musicName = musicName;
      musicItem.video = video;
      musicItem.audio = audio;
      musicItem.notes = notes;
    }
  });
  res.json({ status: "success" });
});

// PATCH /api/music/<6178653131>   = {changedwMusicItem, ...music}
router.patch("/:id", (req, res) => {
  const schema = Joi.object({
    video: Joi.array().items(Joi.string()).optional(),
    audio: Joi.array().items(Joi.string()).optional(),
    notes: Joi.array().items(Joi.string()).optional(),
  });

  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    return res.status(400).json({ status: validationRes.error.details });
  }

  const { video, audio, notes } = req.body;
  music.forEach((musicItem) => {
    if (musicItem.id === req.params.id) {
      musicItem.video = video;
      musicItem.audio = audio;
      musicItem.notes = notes;
    }
  });
  res.json({ status: "success" });
});

// DELETE /api/music/<6178653131>   = { ...music}
router.delete("/:id", (req, res) => {
  music = music.filter((item) => item.id !== req.params.id);
  res.json({ status: "success" });
});

module.exports = { musicRouter: router };
