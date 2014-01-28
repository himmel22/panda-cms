/*
 * share
 */
var async = require('async');
var Article = require('../models/article');
var ShareItem = require('../models/shareItem');
var S = require('string');
var fs = require('fs');
var path = require('path');
var im = require('imagemagick');


exports.viewItemList = function(req, res) {
    async.parallel({
        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        }
    }, 
    function(err, results) {

        var page = req.query.page;
        var catalog =req.params.catalog;
        var limit = 50;

        ShareItem.count({ type: req.params.itemType, catalog: catalog }, function(err, count) {
            ShareItem.find({ type: req.params.itemType, catalog: catalog }).skip((page - 1) * limit).limit(limit).exec(
                function(err, items) {
                    if(err) { next(err); }
                    res.render('share', {
                        articles: results.articles,
                        title: '分享-荒野的呼唤',
                        itemType: req.params.itemType,
                        items: items,
                        pageCount: Math.floor(count/limit) + 1,
                        curPage: page,
                        curUrl: req.url
                    });
                });
        });
    });
}

exports.addItem = function(req, res) {
    if (req.method === 'POST') {
        var shareItem = new ShareItem();
        handlePostItem(req, res, shareItem);
        return;
    }
    res.render('admin/editShareItem', {
        title: '添加分享',
        itemType: req.params.itemType
    });
}


exports.editItem = function(req, res) {
    if (req.method === 'POST') {
        ShareItem.findById(req.params.id, function(err, shareItem) {
            if(err) {
                next(err);
            }
            if(shareItem) {
                handlePostItem(req, res, shareItem);
            } else {
                res.send(404);
            }
        });
        return;
    }
    ShareItem.findById(req.params.id, function(err, shareItem) {

        if(err) {
            next(err);
        }
        if(shareItem) {
            res.render('admin/editShareItem', {
                title: '编辑分享',
                shareItem: shareItem,
                itemType: shareItem.type,
            });
        } else {
            res.send(404);
        }

    });
}

exports.deleteItem = function(req, res, next) {
    ShareItem.remove({ _id: req.params.id }, function(err) {
        if(err) {
            next(err);
        }
    });

    req.session.alert = { message: '已删除！', type: 'alert-success' };
    res.redirect('admin');
}

exports.list = function(req, res, next) {
    var page = req.query.page;
    var limit = 50;

    ShareItem.count({ type: req.params.itemType }, function(err, count) {
        ShareItem.find({ type: req.params.itemType }).skip((page - 1) * limit).limit(limit).sort('_id').exec(
            function(err, items) {
                if(err) { next(err); }
                res.render('admin/listShareItem', {
                    title: '添加分享',
                    itemType: req.params.itemType,
                    items: items,
                    pageCount: Math.floor(count/limit) + 1,
                    curPage: page
                });
            });
    });
}

function handlePostItem(req, res, shareItem) {
    if (req.body.itemTitle.length > 0) {
        shareItem.title = req.body.itemTitle;
    }
    shareItem.datalink = req.body.datalink;
    shareItem.videolink = req.body.videolink;
    shareItem.photolink = req.body.photolink;
    shareItem.thumbnail = req.body.thumbnail;
    shareItem.date = req.body.date;    
    shareItem.tags = req.body.tags;
    shareItem.type = req.body.type;
    shareItem.catalog = req.body.catalog;
    shareItem.weight = (req.body.weight==='' ? 0:req.body.weight);

    if (req.files.photo && req.files.photo.size > 0) {
        //photo
        var hash = req.files.photo.hash;
        var extname = path.extname(req.files.photo.name);
        var newFileName = hash + extname;

        shareItem.photolink = '/upload/images/' + newFileName;
        shareItem.thumbnail = '/upload/images/thumb_' + newFileName;
        handleImage(req.files.photo, newFileName);

    } else if (req.files.thumb && req.files.thumb.size > 0) {
        //thumb
        var hash = req.files.thumb.hash;
        var extname = path.extname(req.files.thumb.name);
        var newFileName = hash + extname;

        shareItem.thumbnail = '/upload/images/thumb_' + newFileName;
        handleImage(req.files.thumb, newFileName);
        
    }

    //data file upload
    if (req.files.datafile && req.files.datafile.size > 0) {
        var hash = req.files.datafile.hash;
        var extname = path.extname(req.files.datafile.name);
        var newFileName = hash + extname;

        shareItem.datalink= '/upload/files/' + newFileName;
        handleFile(req.files.datafile, newFileName);
    }

    shareItem.save(function (err, shareItem) {
        if (err) {
            req.session.alert = { message: '发生异常，请重新提交。', type: 'alert-error' };
            res.redirect('back');
        } else {
            req.session.alert = { message: '成功添加分享！', type: 'alert-success' };
            res.redirect('/admin/share/' + req.body.type);
        }
    });

}


function handleImage(image, newFileName) {
    var uploadPath = __dirname + "/../public/upload/images/";
    fs.rename(image.path, uploadPath + newFileName, function() {
        //生成缩略图
        var thumbName = 'thumb_' + newFileName;
        var srcPath = uploadPath + newFileName;
        var dstPath = uploadPath + thumbName
        im.convert([srcPath, '-resize', '300x200^', '-gravity', 'center', '-extent', '300x200', dstPath],
            function(err, stdout, stderr) {
                console.log(err);
            });
    });
}

function handleFile(file, newFileName) {
    var uploadPath = __dirname + "/../public/upload/files/";
    fs.rename(file.path, uploadPath + newFileName, function(err) {
        if (err) { console.log(err); }
    });
}

















