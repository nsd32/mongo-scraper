const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	headline: {
		type: String,
		required: "An article headline is required"
	},
	summary: {
		type: String,
		required: "An article summary is required"
	},
	url: {
		type: String,
		required: "An article URL is required"
	}, 
	photo: {
		type: String,
		required: "A photo URL is required"
	},
	saved: {
		type: Boolean,
		required: true
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: 'Note'
	}
})

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;