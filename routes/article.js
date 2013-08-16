/*
 * article
 */

var Article = require('../models/article');
var Node = require('../models/node');

exports.view = function(req, res) {
    res.render('admin/index', {
        title: '内容管理'
    });
}

/*
 * 向指定栏目添加文章页面
 */
exports.addView = function(req, res) {

    res.render('admin/addArticle', {
        title: '添加文章',
        catalog: req.query.catalog,
        articleTitle: req.session.articleTitle,
        articleContent: req.session.articleContent
    });

    res.locals.articleTitle = null;
    res.locals.articleContent = null;

}

/*
 * 向指定栏目添加文章 POST
 */
exports.add = function(req, res) {

    var article = new Article({
        title: req.body.articleTitle,
        content:req.body.articleContent,
        catalog: req.query.catalog
    });

    article.save(function (err, article) {
        if (err) {
            req.session.articleTitle = req.body.articleTitle;
            req.session.articleContent = req.body.articleContent;
            req.session.alert = { message: '发生异常，请重新提交。', type: 'alert-error' };
            res.redirect('back');
        } else {
            req.session.alert = { message: '成功添加文章！', type: 'alert-success' };
            res.redirect('admin');
        }
    });

};


/*
 * 编辑文章页面
 */
exports.editView = function(req, res, next) {


    Article.findById(req.params.id, function(err, article) {

        if(err) {
            next(err);
        }

        if(article) {

            res.render('admin/editArticle', {
                title: '编辑文章 - ' + article.title,
                article: article
            });
            
        } else {
            res.send(404);
        }

    });


}

/*
 * 编辑文章 POST
 */
exports.edit = function(req, res) {
    res.render('admin/index', {
        title: '内容管理'
    });
}

/*
 * 编辑固定页面表单页
 */
exports.editNodeView = function(req, res) {

    var nodeName = req.params.nodeName;

    Node.findOne({
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
            nodeContent: nodeContent
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
        content: req.body.nodeContent
    }

    Node.findOneAndUpdate(
        { nodeName: node.nodeName }, 
        node, 
        { upsert: true }, 
        function(err) {

            if (err) {
                req.session.alert = { message: '发生异常，请重新提交。', type: 'alert-error' };
            } else {
                req.session.alert = { message: '修改成功！', type: 'alert-success' };
            }

            res.redirect('/node/' + node.nodeName + '/edit');

        }
    );
}