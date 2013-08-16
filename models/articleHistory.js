var mongoose = require('mongoose');

var ArticleHistorySchema = mongoose.Schema({
    title: String,
    content: String,
    catalog: String,
    articleId: String
});

module.exports = mongoose.model('ArticleHistory', ArticleHistorySchema);