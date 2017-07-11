const request = require('request');
const cheerio = require('cheerio');

const beAGreatTeacherFOTD = () => {
  request('https://www.beagreatteacher.com/daily-fun-fact/', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var FACTobj = {};
      var todaysFact = $('span:contains("Random Fact of the Day:")').parent();

      var factOfTheDay = todaysFact.parent().next().text();
      var factOfTheDayBackup = todaysFact.next().text();

      console.log("`````````````````````````````````")
      console.log("Random fact:", factOfTheDay, factOfTheDayBackup); //One of these will work, the other won't (which is perfect, since it seems to randomly alternate)
      console.log("`````````````````````````````````")

      FACTobj.factoid = factOfTheDay + factOfTheDayBackup; //八月で正しく出来たかどうか確認しないといけないじゃん
      console.log("Full FACTobj object...", FACTobj)
      return FACTobj;
    }
  });
}

module.exports = beAGreatTeacherFOTD;