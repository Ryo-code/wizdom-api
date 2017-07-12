const request   = require('request');
const cheerio   = require('cheerio');
const Quotation = require("../models/quotation");

const quoteOfTheDay = () => {
  request('https://en.wikiquote.org/wiki/Main_Page', (err, resp, html) => {
    if(!err) {
      var $ = cheerio.load(html);
      var QOTDobj = {};
      var todaysQuote = $('small').parent().parent().parent().children().children().children().children().children().children().children();

      var quoter = todaysQuote.has('td:contains("~")').text().trim().slice(0, -1);
      var quote = todaysQuote.children().text().trim().slice(0, -quoter.length -1);

      console.log("==================================================")
      console.log("Quote of the Day...");
      console.log(quote);
      console.log("Quoted by:", quoter);
      console.log("==================================================")

      // QOTDobj.quote = quote;
      // QOTDobj.quoter = quoter;
      // console.log("Full QOTDobj object...", QOTDobj)
      // return QOTDobj;
    }
  })
}

module.exports = quoteOfTheDay;