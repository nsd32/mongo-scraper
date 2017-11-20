
const express = require('express');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const Article = require('./models/article');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 3000;

// Database connection and remove
mongoose.Promise = Promise;
const MONGODB_URI = process.env.MONGOLAB_IVORY_URI || 'mongodb://localhost:27017/mongoHeadlines';
mongoose.connect(MONGODB_URI);
var db = mongoose.connection;
Article.remove({}, function(err, article) {
	if (err) {
		console.log(err);
	}
})


// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Telling express to get static files from the public folder
app.use(express.static('public'));


// Routes
app.get('/', function(req, res) {
	Article.find({}, function(err, articles) {
		res.render('index', { articles: articles });
	});
});

app.get('/all', function(req, res) {
	// db.articledata.find(function(err, articles) {
	// 	res.json(articles);
	// })
	// HTTP request scraping html
	axios.get("http://www.nbcsports.com/nba").then(function(response) {
		var $ = cheerio.load(response.data);

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

			// console.log('Record inserted!');
			// console.log(JSON.stringify(article, null, 2));

			Article
			.findOne({ headline: headline })
			.then(function(headline) {

				if (!headline) {
					Article
					.create(article) 
					.then(function(article) {
						console.log('Article Added!')
						res.send('Scrape Complete');
						
					})
					.catch(function(err) {
						res.json(err);
					});
				} else {
					console.log('Article Already Exists!')
					res.send('No new articles');
				}

			});

		})
		
	});

	// res.send('updated');
	
});

app.get('/saved', function(req, res) {
	Article.find({}, function(err, articles) {
		res.render('index', { articles: articles });
	});
});







app.listen(PORT, function() {
	console.log('Express app listening on port:' + PORT)
})

