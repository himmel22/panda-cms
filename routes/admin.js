
/*
 * admin
 */

exports.index = function(req, res){

    res.render('admin/index', { title: '后台管理' });

};

exports.articles = function(req, res){

    res.render('admin/articles', { title: '内容管理' });

};