/* Database */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/testMongo");

const factSchema = new mongoose.Schema({
  factoid: String,
  timestamp: { type: Date, default: Date.now }
});

const Fact = mongoose.model("Fact", factSchema);

// Fact.create({
//   factoid: "Here's the 4th thing I made, w00t w00t!"
// }, (err, fact) => {
//   if(err){
//     console.log("Error:", err);
//   }else{
//     console.log("New fact:");
//     console.log(fact)
//   }
// });

Fact.find({}, (err, facts) =>{
  if(err){
    console.log("Oh no, error!");
    console.log(err);
  }else{
    console.log("All the facts!");
    console.log(facts);
  }
})

/* Scraper */
const definitionOTD = require("./definition");
const factOTD      = require("./fact");
const newsOTD      = require("./news");
const quotationOTD = require("./quotation");
//コードを短くするには、もっと順調なセレクターを使うべきだろう。ここ、見てみ: https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048
const CronJob   = require('cron').CronJob;
const moment    = require("moment");


const everyMorning = new CronJob('00 15 7 * * 0-6', () => { // This cronjob will run at 7:15:00(AM) everyday
  const rightNow = moment().format('MMMM Do YYYY, h:mm:ss a'); //"May 22nd 2017, 5:38:04 pm"
  console.log("I'm pretty sure it's 7:15 AM... but the precise moment is", rightNow);


  /***** Put all of the scrapers inside here *****/
  definitionOTD();
  // factOTD();
  newsOTD();
  quotationOTD();

}, null, true, 'America/Chicago');




