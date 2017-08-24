const request = require('request');
const cheerio = require('cheerio');
const News    = require("../models/news");

const redditTopNews = () => {
  request('https://www.reddit.com/r/news/top/', (err, resp, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      const todaysTopStory = $('span.rank:contains("1")').next().next().children().first('p.title').children().first();
      const detectIfPaywallExists = todaysTopStory.children().first().text() === "Soft paywall";

      const abbrevLink = detectIfPaywallExists ? todaysTopStory.children().first().next().next().text().trim().slice(1, -1) : todaysTopStory.children().first().next().text().trim().slice(1, -1);
      const newsTitle = detectIfPaywallExists ? todaysTopStory.children().first().next().text() : todaysTopStory.children().first().text();
      const fullLink = detectIfPaywallExists ? todaysTopStory.children().next().attr('href') : todaysTopStory.children().attr('href');

      const commentsNumbers = todaysTopStory.next().next().text().trim().slice(0, 4).trim();
      const commentsLink = todaysTopStory.next().next().children().children().attr('href');
      
      console.log("- - - - - - - - - - - - - - - - - -");
      detectIfPaywallExists ? console.log("Paywall detected!") : console.log("No paywall. Proceed.")
      console.log("News Title  -->", newsTitle);
      console.log("News source -->", abbrevLink);
      console.log("Article link ->", fullLink);
      console.log("#of comments ->", commentsNumbers, "(a", typeof(commentsNumbers), ")");
      console.log("Comments link->", commentsLink);
      console.log("- - - - - - - - - - - - - - - - - -");

      // if(newsTitle.length > 0){
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
      // }else{
      //   console.log("----- ----- ----- ----- ----- ----- ----- ----- ");
      //   console.log("NEWS SCRAPER MESSAGE:");
      //   console.log("I tried to scrape the news, but there was a problem, so I didn't put it in the DB.");
      //   console.log("----- ----- ----- ----- ----- ----- ----- ----- ");
      // }
    }
  });
}

module.exports = redditTopNews;