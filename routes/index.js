/*
 * GET home page.
 */

var Article = require('../models/article');

exports.index = function(req, res) {


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

		res.render('index', {
			title: '荒野的呼唤-潘文石生物多样性基金会',
			articles: articles
		});

	});

};