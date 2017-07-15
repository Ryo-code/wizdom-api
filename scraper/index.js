//コードを短くするには、もっと順調なセレクターを使うべきだろう。ここ、見てみ: https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048
const definitionOTD = require("./definition");
const factOTD       = require("./fact");
const newsOTD       = require("./news");
const quotationOTD  = require("./quotation");
const CronJob       = require('cron').CronJob;
const moment        = require("moment");

//Cronjob arguments: Seconds(0-59) Minutes(0-59) Hours(0-23) Day_Of_Month(1-31) Months(0-11) Day_Of_Week(0-6)
const everyMorning = new CronJob('0 15 7 * * *', () => { // This will run at 7:15:00(AM) everyday
  const rightNow = moment().format('MMMM Do YYYY, h:mm:ss a'); //"May 22nd 2017, 5:38:04 pm"
  console.log("=================================================================");
  console.log("Scraping data & entering into DB –", rightNow);
  console.log("=================================================================");
  definitionOTD();
  factOTD();
  newsOTD();
  quotationOTD();
}, null, true, 'America/Chicago');
