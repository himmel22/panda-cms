var mongoose = require('mongoose');

var ArticleSchema = mongoose.Schema({
    title: String,
    content: String,
    column: String,
    album: Array,
    nodeName: String,
    weight: { type: Number, default: 0 }
});



ArticleSchema.statics.findArticleGroupByColumn = function (callback) {
	
	var articles = {};
	var query = this.model('Article').find({
		column: {
			$exists: true
		}
	}).sort({'weight': -1});

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

ArticleSchema.virtual('columnName').get(function () {
	switch (this.column) {
        case 'xuanze':
        return '选择';
        break;
        case 'yedi':
        return '野地';
        break;
        case 'xingdong':
        return '行动';
        break;
        case 'keyanxiangmu':
        return '科研项目';
        break;
        case 'kepuxiangmu':
        return '科普项目';
        break;
        case 'wenhuaxiangmu':
        return '文化项目';
        break;
        case 'gongyixiangmu':
        return '公益项目';
        break;
        case 'tuandui':
        return '团队';
        break;
        case 'yaoqing':
        return '邀请';
        break;
        default:
        return '栏目';
	}
});

module.exports = mongoose.model('Article', ArticleSchema);