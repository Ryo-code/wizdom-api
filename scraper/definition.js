const request    = require('request');
const cheerio    = require('cheerio');
const Definition = require("../models/definition");

const merriamWebsterWOTD = () => {
  request('https://www.merriam-webster.com/word-of-the-day/repudiate-2017-07-11', (err, resp, html) => {
  // request('https://www.merriam-webster.com/word-of-the-day', (err, resp, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      const WOTDobj = {};

      const todaysWord = $('.word-and-pronunciation h1').text();
      const wordType = $('.main-attr').text().trim();
      const pronunciation = $('.word-syllables').text().trim();

      const exampleOne = $('.wod-definition-container h2:contains("Examples")').next().text();
      const exampleTwo = $('.wod-definition-container h2:contains("Examples")').next().next().text();
      // const exampleChars = exampleOne.length + exampleTwo.length
      // const didYouKnow = $('.wod-did-you-know-container').children().next().html();

      const definitionsBox = $('.wod-definition-container').children().next();//.html() //<--If you need to experiment
      
      /* 
      const def1 = definitionsBox.first('p').text();
      const def2 = definitionsBox.first('p').next('p').text();
      const def4 = definitionsBox.first('p').next('p').next('p').text();
      const def3 = definitionsBox.first('p').next('p').next('p').next('p').text();
      const def5 = definitionsBox.first('p').next('p').next('p').next('p').next('p').text();
      const def6 = definitionsBox.first('p').next('p').next('p').next('p').next('p').next('p').text();

        //The recursive function below is an elaborate way of looping through the strings above 
        // and it will push as many strings as there are into the array called "defsArray".

      */
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
      console.log('meow', defsArray);

      
      console.log("#####################wotd#####################");
      console.log("today's word is:", todaysWord);
      // console.log("scrapedef #1--------->", "(" + def1.length + " characters)", def1);
      // console.log("scrapedef #2--------->", "(" + def2.length + " characters)", def2);
      // console.log("scrapedef #3--------->", "(" + def3.length + " characters)", def3);
      // console.log("scrapedef #4--------->", "(" + def4.length + " characters)", def4);
      // console.log("scrapedef #5--------->", "(" + def5.length + " characters)", def5);
      // console.log("scrapedef #6--------->", "(" + def6.length + " characters)", def6);
      // // console.log("Target3--------->", $('.wod-definition-container h2:contains("Examples")').prev().html() );

      console.log("##########################################")

      /* 
        Use these methods to add content: before(), insertBefore(), 
        replaceWith(), wrap(), prepend(), prependTo(), append() 
      */


      // console.log("Target4--------->", $('.wod-definition-container h2:contains("Examples")').prevUntil('h2', 'p').html() )


      // console.log(" ---===< Word of the day:", todaysWord, "(" + wordType + ")" ,"[" + pronunciation + "] >===---");
      // console.log("Definitions ====>", definitionsOnly) //You have to experiment with .slice() on different days (you could do -40, -50, etc.)
      // console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      // console.log("Example 1 -->", exampleOne);
      // console.log("Example 2 -->", exampleTwo);
      // console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      // console.log("Food for thought:", didYouKnow);
      // console.log("#####################wotd#####################")

    }
  });
}

module.exports = merriamWebsterWOTD;