const mongoose = require("mongoose");
const url = process.env.WIZDOMDB || "mongodb://localhost/wizdom";
mongoose.connect(url);

const definitionSchema = new mongoose.Schema({
  word: String,
  wordType: String,
  pronunciation: String,
  definitions: [ String ],
  example1: String,
  example2: String,
  didYouKnow: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Definition", definitionSchema);
