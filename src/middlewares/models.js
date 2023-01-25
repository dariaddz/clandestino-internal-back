const { getCollections } = require("../db/connections");

module.exports = (req, res, next) => {
  const collections = getCollections();
  req.database = { ...collections };
  next();
};
