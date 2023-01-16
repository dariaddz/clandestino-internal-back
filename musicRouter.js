const express = require("express");
const router = express.Router();

router
  .get("/music", (req, res) => {
    res.json({ music: [] });
  })

  .post("/music", (req, res) => {
    res.json({ music: [1] });
  });

module.exports = { router };
