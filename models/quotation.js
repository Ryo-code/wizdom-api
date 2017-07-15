const mongoose = require("mongoose");
const url = process.env.WIZDOMDB || "mongodb://localhost/wizdom";
mongoose.connect(url);

const quotationSchema = new mongoose.Schema({
  imageSrc: String,
  quote: String,
  quoter: String,
  quoterLink: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quotation", quotationSchema);
