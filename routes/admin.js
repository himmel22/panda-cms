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
exports.articles = function(req, res) {

	var articles = {};

	var query = Article.find({
		catalog: {
			$exists: true
		}
	});

	query.exec(function(err, docs) {

		//按catalog分类
		docs.forEach(function(doc, index) {

			if (articles[doc.catalog] == null) {
				articles[doc.catalog] = [];
			} 
			
			articles[doc.catalog].push(doc);

		});

		res.render('admin/articles', {
			title: '内容管理',
			articles: articles
		});

	});



};