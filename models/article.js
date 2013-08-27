var mongoose = require('mongoose');

var ArticleSchema = mongoose.Schema({
    title: String,
    content: String,
    column: String,
    album: Array
});

module.exports = mongoose.model('Article', ArticleSchema);