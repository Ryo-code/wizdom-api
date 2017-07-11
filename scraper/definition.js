const request = require('request');
const cheerio = require('cheerio');

const merriamWebsterWOTD = () => {
  request('https://www.merriam-webster.com/word-of-the-day', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var WOTDobj = {};

      var todaysWord = $('.word-and-pronunciation h1').text();
      var wordType = $('.main-attr').text().trim();
      var pronunciation = $('.word-syllables').text().trim();

      var entireDefinitionsBox = $('.wod-definition-container').text();
      var exampleOne = $('.wod-definition-container h2:contains("Examples")').next().text();
      var exampleTwo = $('.wod-definition-container h2:contains("Examples")').next().next().text();
      var exampleChars = exampleOne.length + exampleTwo.length
      var definitionsOnly = entireDefinitionsBox.slice(35, -exampleChars -50).trim();
      var didYouKnow = $('.wod-did-you-know-container').children().next().html();

      // console.log(" ---===< Word of the day:", todaysWord, "(" + wordType + ")" ,"[" + pronunciation + "] >===---");
      // console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      // console.log("Definitions ====>", definitionsOnly) //You have to experiment with .slice() on different days (you could do -40, -50, etc.)
      // console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      // console.log("Example 1 -->", exampleOne);
      // console.log("")
      // console.log("Example 2 -->", exampleTwo);
      // console.log("- - - - - - - - - - - - - - - - - - - - ")
      console.log("Food for thought:", didYouKnow);

      WOTDobj.wotd = todaysWord;
      WOTDobj.wordType = wordType;
      WOTDobj.pronunciation = pronunciation;
      WOTDobj.definition = definitionsOnly;
      WOTDobj.example1 = exampleOne;
      WOTDobj.example2 = exampleTwo;
      WOTDobj.didYouKnow = didYouKnow;

      // console.log("Full WOTDobj object...", WOTDobj)
      return WOTDobj;
    }
  });
}

module.exports = merriamWebsterWOTD;