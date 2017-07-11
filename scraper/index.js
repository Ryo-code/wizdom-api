//コードを短くするには、もっと順調なセレクターを使うべきだろう。ここ、見てみ：
//https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048

const CronJob   = require('cron').CronJob;
const moment    = require("moment");

/* Scraper */
const definition = require("./definition");
const fact      = require("./fact");
const news      = require("./news");
const quotation = require("./quotation");



// definition();
// fact();
// news();
quotation();

const everyMorning = new CronJob('00 15 7 * * 0-6', () => { // This cronjob will run at 7:15:00(AM) everyday
  const rightNow = moment().format('MMMM Do YYYY, h:mm:ss a'); //"May 22nd 2017, 5:38:04 pm"
  console.log("I'm pretty sure it's 7:15 AM... but the precise moment is", rightNow);


  /***** Put all of the scrapers inside here *****/


}, null, true, 'America/Chicago');




