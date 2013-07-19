
/*
 * admin
 */

exports.index = function(req, res){
    res.render('admin/index', { title: '内容管理' });
};