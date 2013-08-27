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
		column: {
			$exists: true
		}
	});

	query.exec(function(err, docs) {

		//按column分类
		docs.forEach(function(doc, index) {

			if (articles[doc.column] == null) {
				articles[doc.column] = [];
			} 
			
			articles[doc.column].push(doc);

		});

		res.render('admin/articles', {
			title: '内容管理',
			articles: articles
		});

	});



};