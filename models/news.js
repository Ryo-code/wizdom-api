const mongoose = require("mongoose");
const url = process.env.WIZDOMDB || "mongodb://localhost/wizdom";
mongoose.connect(url);

const newsSchema = new mongoose.Schema({
  newsTitle: String,
  source: String,
  articleLink: String,
  redditLink: String,
  numOfRedditComments: Number,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("News", newsSchema);
