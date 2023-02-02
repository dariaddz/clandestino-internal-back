const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  musicName: {
    type: String,
    required: true,
    unique: true,
  },
  archive: { type: Boolean, required: true, default: false },
  video: { type: Array, required: true },
  audio: { type: Array, required: true },
  notes: { type: Array, required: true },
  userId: String,
});

const MusicModel = mongoose.model("MusicModel", musicSchema);

module.exports = {
  MusicModel,
};
