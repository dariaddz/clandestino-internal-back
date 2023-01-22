const express = require("express");
const morgan = require("morgan");

const app = express();
require("dotenv").config();
const { musicRouter } = require("./src/routers/musicRouter");

app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/music", musicRouter);

const PORT = process.env.PORT || 8090;
// const BASE_URL = "https://api.weatherbit.io/v2.0/current";
// const KEY = process.env.WEATHER_API_KEY;

// app.get("/home", (req, res) => {
//   res.sendStatus(200);
// });

app.listen(PORT, (err) => {
  if (err) {
    console.error("Server launch error: ", err);
  }
  console.log(`Server launched on port ${PORT}`);
});
