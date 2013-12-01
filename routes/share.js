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

exports.news = function(req, res) {
    async.parallel({
        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        }
    }, 
    function(err, results) {
        res.render('share', {
            title: '新闻-荒野的呼唤',
            articles: results.articles,
            shareType: 'news'
        });
    });
}

exports.photos = function(req, res) {
    async.parallel({
        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        }
    }, 
    function(err, results) {
        var photos = [];
        var type = null;
        if (req.query.type) {
            type = req.query.type;
        } else {
            type = 'panda';
        }
        
        for (var i = 12; i >= 1; i--) {
            photos.push({
                img: '/upload/files/photo/' + type + '/' + i + 'w.jpg',
                link: '/upload/files/photo/' + type + '/' + i + '.jpg'
            });
        };
        res.render('share', {
            title: '图片-荒野的呼唤',
            articles: results.articles,
            shareType: 'photos',
            photos: photos
        });
    });
}

exports.videos = function(req, res) {
    async.parallel({
        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        }
    }, 
    function(err, results) {

        var videos = [{
            title: '冰山雪岭——秦岭大熊猫',
            link: 'http://you.video.sina.com.cn/b/117066116-1632781911.html',
            img: '/upload/files/video/1.png'
        }, {
            title: '绿色家园——崇左白头叶猴',
            link: 'http://video.sina.com.cn/v/b/117061098-1632781911.html',
            img: '/upload/files/video/2.png'
        }, {
            title: '蓝色梦想－钦州的白海豚',
            link: 'http://video.sina.com.cn/v/b/117058341-1632781911.html',
            img: '/upload/files/video/3.png'
        }, {
            title: '荒野中的精神家园',
            link: 'http://you.video.sina.com.cn/b/67202805-1632781911.html',
            img: '/upload/files/video/4.png'
        }, {
            title: '北大学子诗朗诵：《一个人的诺亚方舟》',
            link: 'http://you.video.sina.com.cn/b/67201036-1632781911.html',
            img: '/upload/files/video/5.png'
        }, {
            title: '2009-2010影响世界华人盛典举行，潘文石获科学奖',
            link: 'http://you.video.sina.com.cn/b/67202109-1632781911.html',
            img: '/upload/files/video/6.png'
        }, {
            title: '2010年北京论坛潘文石发言',
            link: 'http://you.video.sina.com.cn/b/42968315-1632781911.html',
            img: '/upload/files/video/7.png'
        }, {
            title: '北大校长的人文关怀',
            link: 'http://you.video.sina.com.cn/b/23765442-1632781911.html',
            img: '/upload/files/video/8.png'
        }, {
            title: '青少年生态文明基地成立',
            link: 'http://video.sina.com.cn/v/b/23689233-1632781911.html',
            img: '/upload/files/video/9.png'
        }, {
            title: '潘教授生日花絮',
            link: 'http://you.video.sina.com.cn/b/23435262-1632781911.html',
            img: '/upload/files/video/10.png'
        }];

        res.render('share', {
            title: '视频-荒野的呼唤',
            articles: results.articles,
            shareType: 'videos',
            videos: videos
        });
    });
}

exports.data = function(req, res) {
    async.parallel({
        articles: function(callback) {
            Article.findArticleGroupByColumn(function(err, articles) {
                callback(err, articles);
            });
        }
    }, 
    function(err, results) {
        var files = [
        {
            title: '《继续生存的机会》序言',
            link: '/upload/files/1.pdf',
            img: '/images/pdf.png'
        }, {
            title: '《继续生存的机会》第一章',
            link: '/upload/files/2.pdf',
            img: '/images/pdf.png'
        }, {
            title: '《熊猫虎子》节选',
            link: '/upload/files/3.pdf',
            img: '/images/pdf.png'
        }, {
            title: '我赞成发展克隆技术，反对克隆大熊猫',
            link: '/upload/files/4.pdf',
            img: '/images/pdf.png'
        }, {
            title: '为了美丽富饶的钦州－自然保护是头等大事',
            link: '/upload/files/5.pdf',
            img: '/images/pdf.png'
        }, {
            title: '生命教育是不朽的投资',
            link: '/upload/files/6.pdf',
            img: '/images/pdf.png'
        }, {
            title: '北部湾中华白海豚的保护生物学研究',
            link: '/upload/files/7.pdf',
            img: '/images/pdf.png'
        }, {
            title: '大熊猫的保护生物学研究',
            link: '/upload/files/8.pdf',
            img: '/images/pdf.png'
        }, {
            title: '野生白头叶猴的保护生物学和社会生物学研究',
            link: '/upload/files/9.pdf',
            img: '/images/pdf.png'
        }, {
            title: '《钦州的白海豚》指南',
            link: '/upload/files/10.pdf',
            img: '/images/pdf.png'
        }, {
            title: '《明智的伦理抉择是穿越生存瓶颈的唯一指南》——2010北京论坛主旨发言报告',
            link: '/upload/files/11.pdf',
            img: '/images/pdf.png'
        }];
        res.render('share', {
            title: '资料-荒野的呼唤',
            articles: results.articles,
            shareType: 'data',
            files: files
        });
    });
}

exports.addItem = function(req, res) {
    if (req.method === 'POST') {
        var shareItem = new ShareItem();
        editItem(req, res, shareItem);
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
                editItem(req, res, shareItem);
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
                title: '编辑',
                shareItem: shareItem
            });
        } else {
            res.send(404);
        }

    });
}

exports.deleteItem = function(req, res) {
    return;
}

exports.list = function(req, res) {
    ShareItem.find(
        { type: req.params.itemType }, 
        function(err, items) {
            res.render('admin/listShareItem', {
                title: '添加分享',
                itemType: req.params.itemType,
                items: items
            });
        });
}

function editItem(req, res, shareItem) {
    if (req.body.itemTitle.length > 0) {
        shareItem.title = req.body.itemTitle;
    }
    shareItem.datalink = req.body.datalink;
    shareItem.videolink = req.body.videolink;
    shareItem.photolink = req.body.photolink;
    shareItem.thumbnail = req.body.thumbnail;
    shareItem.date = req.body.date;
    shareItem.tag = req.body.tag;
    shareItem.type = req.params.itemType;
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
        var hash = req.files.thumb.hash;
        var extname = path.extname(req.files.thumb.name);
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
            res.redirect('/admin/share/' + req.params.itemType);
        }
    });

}


function handleImage(image, newFileName) {
    var uploadPath = __dirname + "/../public/upload/images/";
    fs.rename(image.path, uploadPath + newFileName, function() {
        //生成缩略图
        var thumbName = 'thumb_' + image.hash + extname;
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

















