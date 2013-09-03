/*
 * GET home page.
 */

var Article = require('../models/article');
var moment = require('moment');
var S = require('string');

exports.index = function(req, res) {

	Article.findArticleGroupByColumn(function(err, articles) {

		res.render('index', {
			title: '荒野的呼唤-潘文石生物多样性基金会',
			articles: articles,
			moment: moment,
			S: S
		});

	});

};
