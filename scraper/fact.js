const request = require('request');
const cheerio = require('cheerio');
const Fact    = require("../models/fact");

const beAGreatTeacherFOTD = () => {
  request('https://www.beagreatteacher.com/daily-fun-fact/', (err, resp, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      const FACTobj = {};
      const todaysFact = $('span:contains("Random Fact of the Day:")').parent();

      const FOTD = todaysFact.parent().next().text();
      const FOTDBackup = todaysFact.next().text();

      console.log("`````````````````````````````````")
      console.log("Random fact:", FOTD + FOTDBackup);
      console.log("`````````````````````````````````")
      //八月で正しく出来たかどうか確認しないといけないじゃん

      Fact.create({
        factoid: "Here's where you'd put the scraped FOTD"
      }, (err, fact) => {
        if(err){
          console.log("Error:", err);
        }else{
          console.log("New fact:", fact);
        }
      });

    }
  });
}

module.exports = beAGreatTeacherFOTD;
