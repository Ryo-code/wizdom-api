const express = require("express");
const app = express();
const scraper = require("./scraper")
const Fact    = require("./models/fact");

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

app.get("/fact", (req, res) => {
  Fact.findOne({}, {}, { sort: { 'timestamp' : -1 } }, (err, newestFact) => {
    console.log("Newest fact", newestFact)
    return res.json(newestFact);
  });
})

app.listen(process.env.PORT || 3000, () => {
  console.log('The server has started (probably on port 3000)!')
})
