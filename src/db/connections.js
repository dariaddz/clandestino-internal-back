const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// const { MongoClient } = require("mongodb");
// const collections = {};

// Connection URL
const url = process.env.MONGODB_URL_CLAN;

const connectMongo = async () => {
  return await mongoose.connect(url);
};

module.exports = { connectMongo };
