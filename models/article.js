var mongoose = require('mongoose');

var ArticleSchema = mongoose.Schema({
    title: String,
    content: String,
    column: String,
    album: Array
});



ArticleSchema.statics.findArticleGroupByColumn = function (callback) {
	
	var articles = {};
	var query = this.model('Article').find({
		column: {
			$exists: true
		}
	}).sort({'_id': -1});

	query.exec(function(err, docs) {

		//按column分类
		docs.forEach(function(doc, index) {

			if (articles[doc.column] == null) {
				articles[doc.column] = [];
			}

			articles[doc.column].push(doc);

		});

		//合并行动栏目文章
		articles['xingdong'] = [];
		articles['xingdong'] = articles['xingdong'].concat(
			articles['keyanxiangmu'], 
			articles['kepuxiangmu'], 
			articles['wenhuaxiangmu'], 
			articles['gongyixiangmu']);

		callback(err, articles);

	});
}

module.exports = mongoose.model('Article', ArticleSchema);