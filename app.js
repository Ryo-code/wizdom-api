const express = require("express");
const app = express();
const scraper = require("./scraper");

const Definition = require("./models/definition");
const Fact       = require("./models/fact");
const News       = require("./models/news");
const Quotation  = require("./models/quotation");

app.get("/", (req, res) => {

  Definition.remove({word: "savant"}).exec();
  News.remove({source: "popularmechanics.com"}).exec();
  Quotation.remove({quoter: "Claude Joseph Rouget de Lisle"}).exec();
  //Just delete the facts ones

  res.send("This is the Wizdom API. This should delete the useless duplicates in the DB.");
});

app.get("/definition", (req, res) => {
  Definition.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, newestWord) => {
    console.log("Newest word", newestWord)
    return res.json(newestWord);
  });
})

app.get("/fact", (req, res) => {
  Fact.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, newestFact) => {
    console.log("Newest fact", newestFact)
    return res.json(newestFact);
  });
})

app.get("/news", (req, res) => {
  News.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, topNews) => {
    console.log("Top news", topNews)
    return res.json(topNews);
  });
})

app.get("/quotation", (req, res) => {
  Quotation.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, newestQuote) => {
    console.log("Newest quote", newestQuote)
    return res.json(newestQuote);
  });
})

app.listen(process.env.PORT || 3000, () => {
  console.log('The server has started (probably on port 3000)!')
})
