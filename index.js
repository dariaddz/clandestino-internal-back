const express = require("express");
const app = express();

const morgan = require("morgan");
const PORT = process.env.PORT || 8090;

require("dotenv").config();

const { musicRouter } = require("./src/routers/musicRouter");
const { connectMongo } = require("./src/db/connections");
const { json } = require("express");

app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/music", musicRouter);

// обработчик ошибок
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) {
        console.error("Server launch error: ", err);
      }
      console.log(`Server launched on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
