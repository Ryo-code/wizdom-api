const express = require("express");
const app = express();
const scraper = require("./scraper");

const Definition = require("./models/definition");
const Fact       = require("./models/fact");
const News       = require("./models/news");
const Quotation  = require("./models/quotation");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Yo! Whassup");
});

app.get("/quotes", (req, res) => {
  // access quotes from database
  // return array of quotes, or 1
  // search for most recently created_at
  res.json(["Heyyyyy", 'more stufff']);
});

app.get("/definition", (req, res) => {
  Definition.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, word) => {
    console.log("Newest word", word)
    return res.json(word);
  });
})

app.get("/fact", (req, res) => {
  Fact.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, newestFact) => {
    console.log("Newest fact", newestFact)
    return res.json(newestFact);
  });
})

app.listen(process.env.PORT || 3000, () => {
  console.log('The server has started (probably on port 3000)!')
})
