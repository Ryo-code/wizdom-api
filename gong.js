const moment       = require("moment");

function logMessage() {
  const rightNow = moment().format('MMMM Do YYYY, h:mm:ss a'); //"August 22nd 2017, 5:38:04 pm"
  console.log('-=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  ');
  console.log("");
  console.log('GONG!');
  console.log('This console log comes from the herokuCron.js file in the ROOT folder');
  console.log("");
  console.log("According to moment.js, it is:", rightNow )
  console.log('-=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  -=-  ');
}

logMessage();