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
        console.log(node);
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
exports.editNode = function(req, res) {

    var node = {
        nodeName: 'panwenshi',
        title: '1231asdasd',
        content: '1231231asdasd'
    }
    console.log(node);

    Node.findOneAndUpdate(
        {nodeName: node.nodeName }, 
        node, 
        {upsert: true}, 
        function(err) {
            console.log(err);
            res.redirect('/node/' + node.nodeName + '/edit');
        }
    );
}