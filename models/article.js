var mongoose = require('mongoose');

var ArticleSchema = mongoose.Schema({
    title: String,
    content: String,
    catalog: String,
    photo: String
});

module.exports = mongoose.model('Article', ArticleSchema);