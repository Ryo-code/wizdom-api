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

      const exampleOne = $('.wod-definition-container h2:contains("Examples")').next().text();
      const exampleTwo = $('.wod-definition-container h2:contains("Examples")').next().next().text();
      const didYouKnow = $('.wod-did-you-know-container').children().next().text();
      // const didYouKnow = $('.wod-did-you-know-container').children().next().html();

      const definitionsBox = $('.wod-definition-container').children().next();//.html() //<--If you need to experiment
      let current = definitionsBox.first('p');
      const defsArray = [];
      function createDefinitionArray(){
        defsArray.push(current.text());
        let next = current.next('p'); //Scans current to see if there is a paragraph next (if so, run the function again)
        if(next.length > 0){
          current = next; //i.e. After the first iteration, 「current」 = 「definitionsBox.first('p').next('p')」
          createDefinitionArray(); //This is what keeps the function going (like continuing a loop)
        // } else {
        //   console.log('Recursive function complete!')
        }
      }
      createDefinitionArray();
      console.log("#####################wotd#####################");
      console.log("today's word is:", todaysWord);
      console.log(defsArray.length + " definitions:", defsArray);

      console.log("Example 1 -->", exampleOne);
      console.log("Example 2 -->", exampleTwo);
      console.log("Food for thought:", typeof(didYouKnow), didYouKnow);

      console.log("##########################################")

      /* 
        Use these methods to add content: before(), insertBefore(), 
        replaceWith(), wrap(), prepend(), prependTo(), append() 
      */


      // console.log("Target4--------->", $('.wod-definition-container h2:contains("Examples")').prevUntil('h2', 'p').html() )


      // console.log(" ---===< Word of the day:", todaysWord, "(" + wordType + ")" ,"[" + pronunciation + "] >===---");
      // console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      // console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      // console.log("#####################wotd#####################")

    }
  });
}

module.exports = merriamWebsterWOTD;