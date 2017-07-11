const express = require("express");
const app = express();
//コードを短くするには、もっと順調なセレクターを使うべきだろう。ここ、見てみ：
//https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048

var request = require('request');
var cheerio = require('cheerio');
// var rp = require('request-promise'); //使うかどうか分からない

var quoteOfTheDay = () => {
  request('https://en.wikiquote.org/wiki/Main_Page', (err, resp, html) => {
    if(!err) {
      var $ = cheerio.load(html);
      var QOTDobj = {};

      //The code below looks insane because of the way they structured their HTML
      var quoterElement = $('small').parent().parent().parent().children().children().children().children().children().children().children().has('td:contains("~")');
      var quotedBy = quoterElement.text().trim().slice(0, -1);
      var quoteElement = $('small').parent().parent().parent().children().children().children().children().children().children().children().children();
      var actualQuote = quoteElement.text().trim().slice(0, -quotedBy.length -1);

      console.log("==================================================")
      console.log("Quote of the Day...");
      console.log("");
      console.log(actualQuote);
      console.log("");
      console.log("Quoted by:", quotedBy);
      console.log("==================================================")

      QOTDobj.quote = actualQuote;
      QOTDobj.quoter = quotedBy;

      console.log("Full QOTDobj object...", QOTDobj)
      return QOTDobj;
    }
  })
}


var merriamWebsterWOTD = () => {
  request('https://www.merriam-webster.com/word-of-the-day', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var WOTDobj = {};

      var todaysWord = $('.word-and-pronunciation h1').text();
      var wordType = $('.main-attr').text().trim();
      var pronunciation = $('.word-syllables').text().trim();

      //NOTE: Don't change the ORDER of these variables!
      var entireDefinitionsBox = $('.wod-definition-container').text();
      var exampleOne = $('.wod-definition-container h2:contains("Examples")').next().text();
      var exampleTwo = $('.wod-definition-container h2:contains("Examples")').next().next().text();
      var exampleChars = exampleOne.length + exampleTwo.length
      var definitionsOnly = entireDefinitionsBox.slice(35, -exampleChars -50).trim();
      var didYouKnow = $('.wod-did-you-know-container').children().next().text();

      // console.log(" ---===< Word of the day:", todaysWord, "(" + wordType + ")" ,"[" + pronunciation + "] >===---");
      // console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      // console.log("Definitions ====>", definitionsOnly) //You have to experiment with .slice() on different days (you could do -40, -50, etc.)
      // console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      // console.log("Example 1 -->", exampleOne); //DONE!
      // console.log("")
      // console.log("Example 2 -->", exampleTwo); //DONE!
      // console.log("- - - - - - - - - - - - - - - - - - - - ")
      // console.log("Food for thought:", didYouKnow); //DONE!!! (though there are no italics)

      WOTDobj.wotd = todaysWord;
      WOTDobj.wordType = wordType;
      WOTDobj.pronunciation = pronunciation;
      WOTDobj.definition = definitionsOnly;
      WOTDobj.example1 = exampleOne;
      WOTDobj.example2 = exampleTwo;
      WOTDobj.didYouKnow = didYouKnow;

      console.log("Full WOTDobj object...", WOTDobj)
      return WOTDobj;
    }
  });
}


var beAGreatTeacherFOTD = () => {
  request('https://www.beagreatteacher.com/daily-fun-fact/', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var FACTobj = {};

      var factOfTheDay = $('span:contains("Random Fact of the Day:")').parent().parent().next().text();
      var factOfTheDayBackup = $('span:contains("Random Fact of the Day:")').parent().next().text();

      // console.log("`````````````````````````````````")
      // console.log("Random fact:", factOfTheDay, factOfTheDayBackup); //One of these will work, the other won't (which is perfect, since it seems to randomly alternate)

      FACTobj.factoid = factOfTheDay + factOfTheDayBackup; //八月で正しく出来たかどうか確認しないといけないじゃん
      console.log("Full FACTobj object...", FACTobj)
      return FACTobj;
    }
  });
}


var redditTopNews = () => {
  request('https://www.reddit.com/r/news/top/', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var todaysTopStory = $('span.rank:contains("1")').next().next().children().first('p.title').children().first();
      var NEWSobj = {};

      var abbrevLink = todaysTopStory.children().first().next().text().trim().slice(1, -1);
      var newsTitle = todaysTopStory.children().first().text();
      var fullLink = todaysTopStory.children().attr('href');

      var commentsNumbers = todaysTopStory.next().next().text().trim().slice(0, -14).trim();
      var commentsLink = todaysTopStory.next().next().children().children().attr('href');

      console.log("- - - - - - - - - - - - - - - - - -");
      console.log("News Title  -->", newsTitle);
      console.log("News source -->", abbrevLink);
      console.log("Article link ->", fullLink);
      console.log("`````````````````````````````````");
      console.log("#of comments ->", commentsNumbers, "...which is a", typeof(commentsNumbers));
      console.log("Comments link->", commentsLink);

      NEWSobj.title = newsTitle;
      NEWSobj.source = abbrevLink;
      NEWSobj.articleLink = fullLink;
      NEWSobj.numOfRedditComments = parseInt(commentsNumbers);
      NEWSobj.redditLink = commentsLink;

      console.log("Full NEWSobj object...", NEWSobj);
      return NEWSobj;
    }
  });
}




// merriamWebsterWOTD();
// quoteOfTheDay();
// beAGreatTeacherFOTD();
// redditTopNews();
// dailyCurio();


app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Yo! Whassup");
});

app.get("/quotes", (req, res) => {
  // access quotes from database
  // return array of quotes, or 1
  // search for most recently created_at
  res.json(["Heyyyyy", 'more stufff']);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('The server has started (probably on port 3000)!')
})
