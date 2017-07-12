const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/wizdom");

const quotationSchema = new mongoose.Schema({
  quote: String,
  quotedBy: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quotation", quotationSchema);
