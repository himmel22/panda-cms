var mongoose = require('mongoose');

var ArticleSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Article', ArticleSchema);