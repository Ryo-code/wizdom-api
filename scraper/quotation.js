const request = require('request');
const cheerio = require('cheerio');

const quoteOfTheDay = () => {
  request('https://en.wikiquote.org/wiki/Main_Page', (err, resp, html) => {
    if(!err) {
      var $ = cheerio.load(html);
      var QOTDobj = {};

      var quoterElement = $('small').parent().parent().parent().children().children().children().children().children().children().children().has('td:contains("~")');
      var quotedBy = quoterElement.text().trim().slice(0, -1);
      var quoteElement = $('small').parent().parent().parent().children().children().children().children().children().children().children().children();
      var actualQuote = quoteElement.text().trim().slice(0, -quotedBy.length -1);

      // console.log("==================================================")
      // console.log("Quote of the Day...");
      // console.log("");
      // console.log(actualQuote);
      // console.log("");
      // console.log("Quoted by:", quotedBy);
      // console.log("==================================================")

      QOTDobj.quote = actualQuote;
      QOTDobj.quoter = quotedBy;

      console.log("Full QOTDobj object...", QOTDobj)
      return QOTDobj;
    }
  })
}

module.exports = quoteOfTheDay;