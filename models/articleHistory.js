var mongoose = require('mongoose');

var ArticleHistorySchema = mongoose.Schema({
    title: String,
    content: String,
    column: String,
    album: Array,
    articleId: String,
    abstract: String,
    nodeName: String
});

module.exports = mongoose.model('ArticleHistory', ArticleHistorySchema);