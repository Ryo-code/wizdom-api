const request = require('request');
const cheerio = require('cheerio');

const redditTopNews = () => {
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
      console.log("#of comments ->", commentsNumbers, "(a", typeof(commentsNumbers), "which is now being parsedinto an integer)");
      console.log("Comments link->", commentsLink);
      console.log("- - - - - - - - - - - - - - - - - -");

      // NEWSobj.title = newsTitle;
      // NEWSobj.source = abbrevLink;
      // NEWSobj.articleLink = fullLink;
      // NEWSobj.redditLink = commentsLink;
      // NEWSobj.numOfRedditComments = parseInt(commentsNumbers);
      // return NEWSobj;

      /* Rather than returning a news object, just stick the stuff into the DB right here */
      

    }
  });
}



module.exports = redditTopNews;