
const express = require('express');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const axios = require('axios');
const Article = require('./models/article')

const app = express();

const PORT = process.env.PORT || 3000;

// Database connection
mongoose.Promise = Promise;
const MONGODB_URI = process.env.MONGOLAB_IVORY_URI || 'mongodb://localhost:27017/mongoHeadlines';
mongoose.connect(MONGODB_URI);
// var db = mongoose.connection;



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

app.delete('/deleteAll', function(req, res) {
	Article.remove({}, function(err, article) {
		if (err) {
			console.log(err);
		}
		res.send('Deleted All')
	});
});

app.get('/all', function(req, res) {

	// HTTP request scraping html
	axios.get("http://www.nbcsports.com/nba").then(function(response) {
		var $ = cheerio.load(response.data);

		$('div.more-headlines__list-item').each(function(i, element) {
			var headline = $(element).find('div.story__title').children('a').text();

			var summary = $(element).find('div.story__summary').text();

			var url = $(element).find('div.story__title').children('a').attr('href');

			var photo = $(element).find('div.story__image').find('img').attr('src');

			var article = {
				headline: headline,
				summary: summary,
				url: url,
				photo: photo,
				saved: false
			}

			Article.findOne({ headline: headline })
			.then(function(headline) {

				if (!headline) {
					Article
					.create(article) 
					.then(function(article) {
						console.log('Article Added!')
						
					})
					.catch(function(err) {
						console.log(err);
					});
				} else {
					console.log('Article Already Exists!')
					
				}

			});

		});

		res.redirect('/')
	});
	
});

app.put('/saved', function(req, res) {
	console.log(req.body.id)
	Article.update({ _id: req.body.id }, { saved: true })
	.then(function(article) {
		res.json(article)
		console.log(article)
	})
	.catch(function(err) {
		res.json(err);
	})
});

app.get('/saved', function(req, res) {
	Article.find({ saved: true }, function(err, articles) {
		res.render('saved', { articles: articles });
	});
});

app.put('/unsave', function(req, res) {
	console.log(req.body.id)
	Article.update({ _id: req.body.id }, { saved: false })
	.then(function(article) {
		res.json(article)
		console.log(article)
	})
	.catch(function(err) {
		res.json(err);
	})
});

app.post('/notes', function(req, res) {
	Article.update({ _id: req.body.id }, { $push: { notes: req.body.note }})
	.then(function() {
		// res.render('saved', { articles: articles });
		res.redirect('/saved');
	});
});





app.listen(PORT, function() {
	console.log('Express app listening on port:' + PORT)
})

