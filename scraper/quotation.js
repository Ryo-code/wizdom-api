const request   = require('request');
const cheerio   = require('cheerio');
const Quotation = require("../models/quotation");

const quoteOfTheDay = () => {
  request('https://en.wikiquote.org/wiki/Main_Page', (err, resp, html) => {
    if(!err) {
      const $ = cheerio.load(html);
      const QOTDobj = {};
      const todaysQuote = $('small').parent().parent().parent().children().children().children().children().children().children().children().has('td:contains("~")'); //.html() <- To see the HTML structure

      console.log("Quote----------------->:", todaysQuote.children().children().first('td').text().trim());
      console.log("Quoter----------------->:", todaysQuote.children().children().first('td').next().children().children('a').html());
      console.log("QuoterLink----------------->:", "https://en.wikiquote.org" + todaysQuote.children().children().first('td').next().children().children('a').attr('href'));
      console.log("Image source----------------->:", "https:" + todaysQuote.parent().parent().children().children('a').children('img').attr('src') );

      const quote = todaysQuote.children().children().first('td').text().trim();
      const quoter = todaysQuote.children().children().first('td').next().children().children('a').html();
      const quoterLink = "https://en.wikiquote.org" + todaysQuote.children().children().first('td').next().children().children('a').attr('href');
      const imageSrc = "https:" + todaysQuote.parent().parent().children().children('a').children('img').attr('src');

      // Quotation.create({
      //   quote: quote,
      //   quoter: quoter,
      //   quoterLink: quoterLink,
      //   imageSrc: imageSrc,
      // }, (err, quote) => {
      //   if(err){
      //     console.log("Error:", err);
      //   }else{
      //     console.log("New quote:", quote);
      //   }
      // });

    }
  })
}

module.exports = quoteOfTheDay;