const mongoose = require("mongoose");
const url = process.env.WIZDOMDB || "mongodb://localhost/wizdom";
mongoose.connect(url);

const factSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now }
  factoid: String,
});

module.exports = mongoose.model("Fact", factSchema);