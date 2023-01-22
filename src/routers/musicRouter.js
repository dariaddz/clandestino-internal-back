const express = require('express');
const router = new express.Router();

const {
  addMusicValidation,
  patchMusicValidation,
} = require('../middlewares/musicValidation');

const {
  getMusic,
  getMusicItemById,
  addMusicItem,
  changeMusicItem,
  patchMusicItem,
  deleteMusicItem,
} = require('../controllers/musicControllers');

// GET /api/music   = [...music]

router.get('/', getMusic);

// GET /api/music/<6178653131>   = {musicItem with id=6178653131}
router.get('/:id', getMusicItemById);

// POST /api/music/   = {newMusicItem, ...music}
router.post('/', addMusicValidation, addMusicItem);

// PUT /api/music/<6178653131>   = {changedwMusicItem, ...music}
router.put('/:id', addMusicValidation, changeMusicItem);

// PATCH /api/music/<6178653131>   = {changedwMusicItem, ...music}
router.patch('/:id', patchMusicValidation, patchMusicItem);

// DELETE /api/music/<6178653131>   = { ...music}
deleteMusicItem, router.delete('/:id', deleteMusicItem);

module.exports = {musicRouter: router};
