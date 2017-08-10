const express = require("express");
const app     = express();
const scraper = require("./scraper");

const Word      = require("./models/word");
const Fact      = require("./models/fact");
const News      = require("./models/news");
const Quotation = require("./models/quotation");

app.get("/", (req, res) => {
  res.send("This is the Wizdom API.");

  /* If you need to delete something from the DB, you can do it like this...  */
  // Word.remove({word: "savant"}).exec();
  // News.remove({source: "popularmechanics.com"}).exec();
});

app.get("/word", (req, res) => {
  Word.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, newestWord) => {
    console.log("Newest word", newestWord.word)
    return res.json(newestWord);
  });
});

app.get("/fact", (req, res) => {
  //TODO: maybe create middleWare to check if fact.length > 5...
  //and if not, get a random one from the DB?
  Fact.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, newestFact) => {
    console.log("Newest fact", newestFact)
    return res.json(newestFact);
  });
});

app.get("/news", (req, res) => {
  News.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, topNews) => {
    console.log("Top news", topNews)
    return res.json(topNews);
  });
});

app.get("/quotation", (req, res) => {
  Quotation.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, newestQuote) => {
    console.log("Newest quote is from", newestQuote.quoter)
    return res.json(newestQuote);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('The server has started on port', port);
});
