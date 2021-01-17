var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
const writingStream = fs.createWriteStream("Post.csv");
const ab = "https://timesofindia.indiatimes.com/sports";

writingStream.write("hello welcolme \n");
function scrapeThisLink(link) {
	request(link, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			var heading = $("._2NFXP ");
			heading = heading.find("h1").text().replace(/\s\s+/g, "");
			// console.log(heading.find("h1").text());
			var text = $(".ga-headlines");
			text = text.text().replace(/\s\s+/g, "");
			// console.log(text.text());
			var img = $("._2gIK- img");
			img = img.attr("src").replace(/\s\s+/g, "");
			// console.log(img.attr("src"));
			writingStream.write(`${heading}, ${text}, ${img}\n`);
			// if (heading == undefined || text == undefined || img == undefined) {
			// 	console.log(link);
			// }
		}
	});
}
// scrapeThisLink(
// 	"https://timesofindia.indiatimes.com/sports/cricket/news/toss-up-between-ranji-and-vijay-hazare-nz-to-tour-before-t20-world-cup/articleshow/80316311.cms"
// );

request(ab, (error, response, html) => {
	if (!error && response.statusCode == 200) {
		const $ = cheerio.load(html);
		const siteHeading = $(".title");

		// console.log(siteHeading.find("h1").text());
		$("#c_sport_wdt_1 .w_tle a").each((i, ele) => {
			// .sports-home-videos
			// console.log(ele.parent.parent.parent.parent.parent.nodeName);

			const item = $(ele).text();
			const link = $(ele).attr("href");
			if (
				!(
					link.includes("latest-videos") ||
					link.startsWith("/videos") ||
					link.includes("in-pics")
				)
			) {
				console.log(ab + link);
				scrapeThisLink(ab + link);
			}

			// scrapeThisLink(ab + link);
		});
		console.log("done");
	}
});
