const express = require("express");
const morgan = require("morgan");
const got = require("got");
const app = express();
require("dotenv").config();

app.use(morgan("tiny"));
// app.use(router);

// const { router } = require("./musicRouter");

const PORT = process.env.PORT || 8090;
const BASE_URL = "https://api.weatherbit.io/v2.0/current";
const KEY = process.env.WEATHER_API_KEY;

app.get("/home", (req, res) => {
  res.sendStatus(200);
});

app.get("/api/weather", async (req, res) => {
  try {
    const { latitude, longtitude } = req.query;

    if (!latitude) {
      return res.status(400).json({ message: "latitude field is mandatory" });
    }

    if (!longtitude) {
      return res.status(400).json({ message: "longtitude field is mandatory" });
    }

    const response = await got(BASE_URL, {
      searchParams: {
        key: KEY,
        lat: latitude,
        lon: longtitude,
      },

      responseType: "json",
    });
    const [weatherData] = response.body.data;
    const { city_name, temp } = weatherData;

    res.json({ city_name, temp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Server launch error: ", err);
  }
  console.log(`Server launched on port ${PORT}`);
});

// ===============without express framework================

// const http = require("http");

// const PORT = 8090;

// const requestHandler = (req, res) => {
//   res.writeHead(200, { "Content-type": "text/html" });
//   res.end("<h1>TEXT HEADER </h1>");
// };

// const server = http.createServer(requestHandler);

// server.listen(PORT, (err) => {
//   if (err) {
//     console.error("Server launch error: ", err);
//   }
//   console.log(`Server launched on port ${PORT}`);
// });
