//This file should only ever be run by heroku scheduler 
//(as opposed to the scraper in scraper/index, which uses cron)
const moment       = require("moment");
const factOTD      = require("./fact");
const newsOTD      = require("./news");
const quotationOTD = require("./quotation");
const wordOTD      = require("./word");

function logMessage() {
  const rightNow = moment().format('MMMM Do YYYY, h:mm:ss a'); //"August 22nd 2017, 5:38:04 pm"
  console.log('-=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  ');
  console.log("");
  console.log('GONG!');
  console.log('This console log comes from the herokuCron.js file in the ROOT folder');
  console.log("");
  console.log("According to moment.js, it is:", rightNow )
  console.log('-=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  ');


  // console.log("=================================================================");
  // console.log("Scraping data & entering into DB –", rightNow);
  // console.log("=================================================================");

  // factOTD();
  // newsOTD();
  // quotationOTD();
  // wordOTD();
}

logMessage();