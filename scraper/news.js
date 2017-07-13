const request = require('request');
const cheerio = require('cheerio');
const News    = require("../models/news");

const redditTopNews = () => {
  request('https://www.reddit.com/r/news/top/', (err, resp, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      const todaysTopStory = $('span.rank:contains("1")').next().next().children().first('p.title').children().first();
      const abbrevLink = todaysTopStory.children().first().next().text().trim().slice(1, -1);
      const newsTitle = todaysTopStory.children().first().text();
      const fullLink = todaysTopStory.children().attr('href');

      const commentsNumbers = todaysTopStory.next().next().text().trim().slice(0, -14).trim();
      const commentsLink = todaysTopStory.next().next().children().children().attr('href');

      console.log("- - - - - - - - - - - - - - - - - -");
      console.log("News Title  -->", newsTitle);
      console.log("News source -->", abbrevLink);
      console.log("Article link ->", fullLink);
      console.log("#of comments ->", commentsNumbers, "(a", typeof(commentsNumbers), "which is now being parsed into an integer)");
      console.log("Comments link->", commentsLink);
      console.log("- - - - - - - - - - - - - - - - - -");

      News.create({
        newsTitle: newsTitle,
        source: abbrevLink,
        articleLink: fullLink,
        redditLink: commentsLink,
        numOfRedditComments: commentsNumbers,
      }, (err, news) => {
        if(err){
          console.log("Error:", err);
        }else{
          console.log("Top news of the day:", news);
        }
      });

    }
  });
}

module.exports = redditTopNews;