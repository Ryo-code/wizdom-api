const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/wizdom");

const factSchema = new mongoose.Schema({
  factoid: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Fact", factSchema);