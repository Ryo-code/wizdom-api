const request = require('request');
const cheerio = require('cheerio');
const Word = require("../models/word");

const merriamWebsterWOTD = () => {
  request('https://www.merriam-webster.com/word-of-the-day', (err, resp, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      const todaysWord = $('.word-and-pronunciation h1').text();
      const wordType = $('.main-attr').text().trim();
      const pronunciation = $('.word-syllables').text().trim();

      const exampleOne = $('.wod-definition-container h2:contains("Examples")').next().text();
      const exampleTwo = $('.wod-definition-container h2:contains("Examples")').next().next().text();
      const didYouKnow = $('.wod-did-you-know-container').children().next().text();//.html() <-- to see italics and links

      const definitionsBox = $('.wod-definition-container').children().next();//.html() //<--Experiment w\ stuff like ".siblings(<em>)" or ".content()"
      let current = definitionsBox.first('p');
      const defsArray = [];

      const createDefinitionArray = () => {
        defsArray.push(current.text());
        let next = current.next('p'); //Scans current to see if there is a paragraph next (if so, run the function again)
        if (next.length > 0) {
          current = next; //i.e. After the first iteration, 「current」 = 「definitionsBox.first('p').next('p')」, etc.
          createDefinitionArray();
        }
      }
      createDefinitionArray();

      // console.log("###################WOTD###################");
      // console.log("Word of the day:", todaysWord);
      // console.log(defsArray.length + " definitions:", defsArray);
      // console.log("Example 1 -->", exampleOne);
      // console.log("Example 2 -->", exampleTwo);
      // console.log("Food for thought:", typeof(didYouKnow), didYouKnow);
      // // To manipulate content: before(), insertBefore(), replaceWith(), wrap(), prepend(), prependTo(), append(), etc.
      // console.log("##########################################")

      // if(todaysWord.length > 0){
        Word.create({
          word: todaysWord,
          wordType: wordType,
          pronunciation: pronunciation,
          definitions: defsArray,
          example1: exampleOne,
          example2: exampleTwo,
          didYouKnow: didYouKnow,
        }, (err, newWord) => {
          if (err) {
            console.log("Error:", err);
          } else {
            console.log("New word of the day:", newWord);
          }
        });
      // }else{
      //   console.log("----- ----- ----- ----- ----- ----- ----- ----- ");
      //   console.log("WORD SCRAPER MESSAGE:");
      //   console.log("I tried to scrape the word of the day, but there was a problem, so I didn't put it in the DB.");
      //   console.log("----- ----- ----- ----- ----- ----- ----- ----- ");
      // }
    }
  });
}

module.exports = merriamWebsterWOTD;