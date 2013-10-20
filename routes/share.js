/*
 * share
 */
var async = require('async');
var Article = require('../models/article');
var S = require('string');

exports.news = function(req, res) {
    async.parallel({
        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        }
    }, 
    function(err, results) {
        res.render('share', {
            title: '新闻-荒野的呼唤',
            articles: results.articles,
            shareType: 'news'
        });
    });
}

exports.photos = function(req, res) {
    async.parallel({
        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        }
    }, 
    function(err, results) {
        res.render('share', {
            title: '图片-荒野的呼唤',
            articles: results.articles,
            shareType: 'photos' 
        });
    });
}

exports.videos = function(req, res) {
    async.parallel({
        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        }
    }, 
    function(err, results) {
        res.render('share', {
            title: '视频-荒野的呼唤',
            articles: results.articles,
            shareType: 'videos'
        });
    });
}

exports.data = function(req, res) {
    async.parallel({
        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        }
    }, 
    function(err, results) {
        res.render('share', {
            title: '资料-荒野的呼唤',
            articles: results.articles,
            shareType: 'data'
        });
    });
}

function getColumnName (columnId) {
    switch (columnId) {
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
}