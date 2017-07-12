const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/wizdom");

const factSchema = new mongoose.Schema({
  factoid: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Fact", factSchema);