const request = require('request');
const cheerio = require('cheerio');
const News    = require("../models/news");

const redditTopNews = () => {
  request('https://www.reddit.com/r/news/top/', (err, resp, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      const todaysTopStory = $('span.rank:contains("1")').next().next().children().first('p.title').children().first();
      const NEWSobj = {};

      const abbrevLink = todaysTopStory.children().first().next().text().trim().slice(1, -1);
      const newsTitle = todaysTopStory.children().first().text();
      const fullLink = todaysTopStory.children().attr('href');

      const commentsNumbers = todaysTopStory.next().next().text().trim().slice(0, -14).trim();
      const commentsLink = todaysTopStory.next().next().children().children().attr('href');

      console.log("- - - - - - - - - - - - - - - - - -");
      console.log("News Title  -->", newsTitle);
      console.log("News source -->", abbrevLink);
      console.log("Article link ->", fullLink);
      console.log("#of comments ->", commentsNumbers, "(a", typeof(commentsNumbers), "which is now being parsedinto an integer)");
      console.log("Comments link->", commentsLink);
      console.log("- - - - - - - - - - - - - - - - - -");

    }
  });
}



module.exports = redditTopNews;