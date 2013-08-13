var fs = require('fs');
var path = require('path');

/*
 * upload
 */
exports.image = function(req, res){

	var uploadPath = __dirname + "/../public/upload/images/";
	var newFileName = req.files.upload.hash + path.extname(req.files.upload.name);

	fs.rename(req.files.upload.path , uploadPath + newFileName, callback);

	function callback () {

	    var funcNum = req.query.CKEditorFuncNum;

	    var url = '/upload/images/' + newFileName;

	    var message = '';

	    var response = "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction(" + funcNum + ", '" + url + "', '" + message + "');</script>";

	    res.send(response);
	}
    
};

