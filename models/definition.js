const mongoose = require("mongoose");
const url = process.env.WIZDOMDB || "mongodb://localhost/wizdom";
mongoose.connect(url);

const definitionSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  word: String,
  wordType: String,
  pronunciation: String,
  definitions: [ String ],
  example1: String,
  example2: String,
  didYouKnow: String
});

module.exports = mongoose.model("Definition", definitionSchema);
