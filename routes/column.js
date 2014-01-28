/*
 * node
 */
var async = require('async');
var Article = require('../models/article');
var S = require('string');

exports.view = function(req, res) {
    async.parallel({

        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        }

    }, 
    function(err, results) {

        var columnName = getColumnName(req.params.columnId)
        res.render('column', {
            title: columnName + '-荒野的呼唤',
            articles: results.articles,
            column: req.params.columnId,
            columnName: columnName,
            S:S
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