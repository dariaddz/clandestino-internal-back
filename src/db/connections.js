const { MongoClient } = require("mongodb");
const collections = {};

const getCollections = () => {
  return collections;
};

// Connection URL
const url = process.env.MONGODB_URL_CLAN;
const client = new MongoClient(url);

// Database Name
const dbName = "clan-internal";

const connectMongo = async () => {
  // Use connect method to connect to the server
  await client.connect();

  const db = client.db(dbName);
  collections.Music = db.collection("music");
  console.log("Database connected successfully");
  //   return { Music };
};

module.exports = { connectMongo, getCollections };
