
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const Article = require('./models/article');

const app = express();

mongoose.Promise = Promise;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mongoHeadlines';
mongoose.connect(MONGODB_URI);

app.use('/', routes);

var db = mongoose.connection;



request("http://www.nbcsports.com/nba", (error, response, html) => {
	var $ = cheerio.load(html);

	$('div.more-headlines__list-item').each(function(i, element) {
		var headline = $(element).find('div.story__title').children('a').text();
		// console.log(headline);

		var summary = $(element).find('div.story__summary').text();
		// console.log(summary)

		var url = $(element).find('div.story__title').children('a').attr('href');
		// console.log(url)

		var photo = $(element).find('div.story__image').find('img').attr('src');
		// console.log(photo)

		var article = {
			headline: headline,
			summary: summary,
			url: url,
			photo: photo
		}

		console.log('Record inserted!');
		console.log(JSON.stringify(article, null, 2));

		Article.create(article, function(error, article) {
			if (error) {
				console.log(error)
			}
		})
	})
});










app.listen(3000, function() {
	console.log('Express app listening on port 3000!')
})

