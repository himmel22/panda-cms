
/*
 * article
 */

exports.index = function(req, res){
	res.chrome.log(req);

    res.render('admin/index', { title: '内容管理' });
};