/*
 * article
 */

var Article = require('../models/article');
var Node = require('../models/node');

exports.add = function(req, res) {

    var article = new Article({
        name: 'fluffy'
    });

    // article.save(function (err, fluffy) {
    //     if (err) {
    //         res.chrome.log(err);
    //     }
    //     res.chrome.log(fluffy);

    //     res.render('admin/index', { title: '内容管理' });
    // });


};

exports.view = function(req, res) {
    res.render('admin/index', {
        title: '内容管理'
    });
}

exports.editView = function(req, res) {
    res.render('admin/index', {
        title: '内容管理'
    });
}

exports.edit = function(req, res) {
    res.render('admin/index', {
        title: '内容管理'
    });
}

exports.addView = function(req, res) {
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
 * 编辑固定页面
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