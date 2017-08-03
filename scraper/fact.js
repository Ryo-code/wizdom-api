const request = require('request');
const cheerio = require('cheerio');
const Fact    = require("../models/fact");

const beAGreatTeacherFOTD = () => {
  request('https://www.beagreatteacher.com/daily-fun-fact/', (err, resp, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      const todaysFact = $('span:contains("Random Fact of the Day:")').parent();

      const FOTD = todaysFact.next().text();
      const FOTDBackup = todaysFact.parent().next().text();

      const fact = FOTD + FOTDBackup;

      console.log("`````````````````````````````````");
      console.log("Fact of the day:", fact);
      console.log("`````````````````````````````````");
      //八月で正しく出来たかどうか確認しないといけないじゃん
      
      // if(fact.length > 0){
        Fact.create({
          factoid: "A single cloud can weigh more than 1 million pounds." // || fact
        }, (err, fact) => {
          if(err){
            console.log("Error:", err);
          }else{
            console.log("New fact of the day:", fact);
          }
        });
      // }else{
      //   console.log("----- ----- ----- ----- ----- ----- ----- ----- ");
      //   console.log("FACT SCRAPER MESSAGE:");
      //   console.log("I tried to scrape the fact, but there was a problem, so I didn't put it in the DB.");
      //   console.log("----- ----- ----- ----- ----- ----- ----- ----- ");
      // }
    }
  });
}

module.exports = beAGreatTeacherFOTD;
