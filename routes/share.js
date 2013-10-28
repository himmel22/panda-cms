/*
 * share
 */
var async = require('async');
var Article = require('../models/article');
var S = require('string');

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
            title: '继续生存的机会-序言',
            link: '/upload/files/1.pdf',
            img: '/images/pdf.png'
        }, {
            title: '继续生存的机会-第一章',
            link: '/upload/files/2.pdf',
            img: '/images/pdf.png'
        }, {
            title: '虎子节选 (恢复)',
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
            title: '生命教育是不朽的投资（彩色版）',
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
            title: '钦州的白海豚',
            link: '/upload/files/10.pdf',
            img: '/images/pdf.png'
        }, {
            title: '北京论坛',
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