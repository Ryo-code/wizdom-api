//コードを短くするには、もっと順調なセレクターを使うべきだろう。ここ、見てみ: https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048
const definitionOTD = require("./definition");
const factOTD       = require("./fact");
const newsOTD       = require("./news");
const quotationOTD  = require("./quotation");
const CronJob       = require('cron').CronJob;
const moment        = require("moment");

const everyMorning = new CronJob('00 15 7 * * 0-6', () => { // This will run at 7:15:00(AM) everyday
  const rightNow = moment().format('MMMM Do YYYY, h:mm:ss a'); //"May 22nd 2017, 5:38:04 pm"
  console.log("It's probably 7:15 AM... but the precise moment is", rightNow);
  definitionOTD();
  factOTD();
  newsOTD();
  quotationOTD();
}, null, true, 'America/Chicago');