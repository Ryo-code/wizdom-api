const mongoose = require("mongoose");
const url = process.env.WIZDOMDB || "mongodb://localhost/wizdom";
mongoose.connect(url);

const quotationSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  imageSrc: String,
  quote: String,
  quoter: String,
  quoterLink: String
});

module.exports = mongoose.model("Quotation", quotationSchema);
