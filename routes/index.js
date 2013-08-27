/*
 * GET home page.
 */

var Article = require('../models/article');
var moment = require('moment');
var S = require('string')

exports.index = function(req, res) {


	var articles = {};

	var query = Article.find({
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

		res.render('index', {
			title: '荒野的呼唤-潘文石生物多样性基金会',
			articles: articles,
			moment: moment,
			S: S
		});

	});

};