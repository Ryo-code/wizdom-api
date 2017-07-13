const mongoose = require("mongoose");
const url = process.env.WIZDOMDB || "mongodb://localhost/wizdom";
mongoose.connect(url);

const factSchema = new mongoose.Schema({
  factoid: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Fact", factSchema);