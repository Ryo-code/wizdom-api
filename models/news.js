const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/wizdom");

const newsSchema = new mongoose.Schema({
  title: String,
  source: String,
  articleLink: String,
  redditLink: String,
  numOfRedditComments: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("News", newsSchema);
