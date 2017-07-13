const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/wizdom");

const definitionSchema = new mongoose.Schema({
  word: String,
  wordType: String,
  pronunciation: String,
  definitions: [ String ], //or else it's [{ String }]
  example1: String,
  example2: String,
  didYouKnow: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Definition", definitionSchema);
