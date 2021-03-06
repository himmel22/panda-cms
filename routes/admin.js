/*
 * admin
 */

var Article = require('../models/article');

exports.index = function(req, res) {

	res.render('admin/index', {
		title: '后台管理'
	});

};


/*
 * 内容管理页面
 */
exports.articles = function(req, res, next) {

	Article.findArticleGroupByColumn(function(err, articles) {
		if(err) {
			next(err);
		} else {
			res.render('admin/articles', {
				title: '内容管理',
				articles: articles
			});
		}
	});



};