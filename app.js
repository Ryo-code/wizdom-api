const express = require("express");
const app = express();
const scraper = require("./scraper")
const Fact    = require("./models/fact");

// Next Steps:
// 1.  Set up mongo
// 2.  Connect mongo to express - mongoose
// 2.5 Set up mongoose table structure (possible that created_at and updated_at are automatic)
// 3.  Insert data from scraper into mongo
// 4.  Create route that spits out data from mongo


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
  Fact.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, newestFact) => {
    console.log("Newest fact", newestFact)
    return res.json(newestFact);
  });
})

app.listen(process.env.PORT || 3000, () => {
  console.log('The server has started (probably on port 3000)!')
})
