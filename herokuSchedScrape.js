/***  This file should only ever be run by heroku scheduler         ***/
/**   (as opposed to the scraper in scraper/index, which uses cron)  **/
/*    Heroku から他のホスティングサイトに移動させたら、これを消して良い         */
//To open heroku scheduler → heroku addons:open scheduler

const factOTD      = require("scraper/fact");
const newsOTD      = require("scraper/news");
const quotationOTD = require("scraper/quotation");
const wordOTD      = require("scraper/word");
const moment       = require("moment");

const runScraperFromHerokuScheduler = () => {
  const rightNow = moment().format('MMMM Do YYYY, h:mm:ss a'); //"August 22nd 2017, 5:38:04 pm"
  console.log('-=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  ');
  console.log('GONG!');
  console.log('This console log comes from the herokuCron.js file in the ROOT folder');
  console.log('-=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  ');

  console.log("");

  console.log("=================================================================");
  console.log("This notice is brought to you by... herokuSchedScraper.js")
  console.log("Scraping data & entering into DB –", rightNow);
  console.log("=================================================================");

  factOTD();
  newsOTD();
  quotationOTD();
  wordOTD();
}

runScraperFromHerokuScheduler();