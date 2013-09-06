var fs = require('fs');
var path = require('path');
var im = require('imagemagick');

/*
 * upload
 */
exports.ckimage = function(req, res, next) {

	handleImage(req.files.upload, function(err, newFileName) {
		var funcNum = req.query.CKEditorFuncNum;
		var url = '/upload/images/' + newFileName;
		var message = '';
		var response = "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction(" + funcNum + ", '" + url + "', '" + message + "');</script>";
		res.send(response);
	});

};

exports.image = function(req, res, next) {

	handleImage(req.files.image, function(err, newFileName) {
		if(err) {
			next(err);
		} else {
			var url = '/upload/images/' + newFileName;
			res.send({ url: url });
		}
	});

}

function handleImage(image, callback) {
	var uploadPath = __dirname + "/../public/upload/images/";
	var hash = image.hash;
	var extname = path.extname(image.name);
	var newFileName = hash + extname;

	fs.rename(image.path, uploadPath + newFileName, function() {
		//生成缩略图
		var thumbName = hash + '_thumb' + extname;
		var srcPath = uploadPath + newFileName;
		var dstPath = uploadPath + thumbName
		im.convert([srcPath, '-resize', '300x150^', '-gravity', 'center', '-extent', '300x150', dstPath],
			function(err, stdout, stderr) {
				if (err) next(err);
			});
	});
	callback(null, newFileName);
}