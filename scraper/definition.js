const request    = require('request');
const cheerio    = require('cheerio');
const Definition = require("../models/definition");

const merriamWebsterWOTD = () => {
  request('https://www.merriam-webster.com/word-of-the-day', (err, resp, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      const WOTDobj = {};

      const todaysWord = $('.word-and-pronunciation h1').text();
      const wordType = $('.main-attr').text().trim();
      const pronunciation = $('.word-syllables').text().trim();

      const entireDefinitionsBox = $('.wod-definition-container').text();
      const exampleOne = $('.wod-definition-container h2:contains("Examples")').next().text();
      const exampleTwo = $('.wod-definition-container h2:contains("Examples")').next().next().text();
      const exampleChars = exampleOne.length + exampleTwo.length
      const definitionsOnly = entireDefinitionsBox.slice(35, -exampleChars -50).trim();
      const didYouKnow = $('.wod-did-you-know-container').children().next().html();

      console.log("#####################wotd#####################")
      console.log(" ---===< Word of the day:", todaysWord, "(" + wordType + ")" ,"[" + pronunciation + "] >===---");
      console.log("Definitions ====>", definitionsOnly) //You have to experiment with .slice() on different days (you could do -40, -50, etc.)
      console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      console.log("Example 1 -->", exampleOne);
      console.log("")
      console.log("Example 2 -->", exampleTwo);
      console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      console.log("Food for thought:", didYouKnow);
      console.log("#####################wotd#####################")

    }
  });
}

module.exports = merriamWebsterWOTD;