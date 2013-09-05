var fs = require('fs');
var path = require('path');
var im = require('imagemagick');

/*
 * upload
 */
exports.ckimage = function(req, res, next){

	var uploadPath = __dirname + "/../public/upload/images/";
	var hash = req.files.upload.hash;
	var extname = path.extname(req.files.upload.name);
	var newFileName = hash + extname;

	fs.rename(req.files.upload.path , uploadPath + newFileName, callback);

	function callback () {

	    var funcNum = req.query.CKEditorFuncNum;
	    var url = '/upload/images/' + newFileName;
	    var message = '';
	    var response = "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction(" + funcNum + ", '" + url + "', '" + message + "');</script>";
	    res.send(response);

	    //生成缩略图
	    var thumbName = hash + '_thumb' + extname;
	    var srcPath = uploadPath + newFileName;
	    var dstPath = uploadPath + thumbName
	    im.convert([srcPath, '-resize', '300x150^', '-gravity', 'center', '-extent', '300x150', dstPath],
	    	function(err, stdout, stderr){
	    		if (err) next(err);
	    	});

	}
    
};

exports.image = function(req, res, next) {
	res.send(200);
}

