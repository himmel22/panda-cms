/*
 * node
 */
var async = require('async')
var Article = require('../models/article');
var ArticleHistory = require('../models/articleHistory');


exports.viewNode = function(req, res) {
    async.parallel({

        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        },
        article: function(callback) {
            Article.findOne({ 'nodeName': req.params.nodeName }, function(err, article) {
                callback(err, article)
            });
        }

    }, 
    function(err, results) {

        res.render('node', {
            title: results.article.title + '-荒野的呼唤',
            articles: results.articles,
            article: results.article
        });
    });
}


/*
 * 编辑固定页面表单页
 */
exports.editNodeView = function(req, res) {

    var nodeName = req.params.nodeName;

    Article.findOne({
        nodeName: nodeName
    }, function(err, node) {

        if (err) {
            console.log(err);
            return err;
        }

        var nodeTitle = '';
        var nodeContent = '';
        if (node) {
            nodeTitle = node.title;
            nodeContent = node.content;
        }

        res.render('admin/editNode', {
            title: '编辑固定页面 - ' + nodeTitle,
            nodeName: nodeName,
            nodeTitle: nodeTitle,
            nodeContent: nodeContent,
            nodeColumn: req.query.column,
        });

    });
}

/*
 * 编辑固定页面 POST
 */
exports.editNode = function(req, res, next) {

    var node = {
        nodeName: req.params.nodeName,
        title: req.body.nodeTitle,
        content: req.body.nodeContent,
        column: req.query.column
    }

    Article.findOneAndUpdate(
        { nodeName: node.nodeName }, 
        node, 
        { upsert: true }, 
        function(err) {

            if (err) {
                req.session.alert = { message: '发生异常，请重新提交。', type: 'alert-error' };
                next(err);
            } else {
                req.session.alert = { message: '修改成功！', type: 'alert-success' };
            }

            res.redirect('/node/' + node.nodeName + '/edit');

        }
    );
}
