const mongoose = require("mongoose");
const { getMaxListeners } = require("../app");

const bookSchema = mongoose.Schema({
  cover: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
