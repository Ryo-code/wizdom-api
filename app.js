const express = require("express");
const app = express();
const scraper = require("./scraper");

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

app.listen(process.env.PORT || 3000, () => {
  console.log('The server has started (probably on port 3000)!')
})
