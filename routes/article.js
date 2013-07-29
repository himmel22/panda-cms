/*
 * article
 */

 var Article = require('../models/article');

 exports.add = function (req, res) {

    var article = new Article({ name: 'fluffy' });

    article.save(function (err, fluffy) {
        if (err) {
            res.chrome.log(err);
        }
        res.chrome.log(fluffy);
        
        res.render('admin/index', { title: '内容管理' });
    });

    
 };

 exports.view = function (req, res) {
    res.render('admin/index', { title: '内容管理' });
 }

 exports.editView = function (req, res) {
    res.render('admin/index', { title: '内容管理' });
 }

 exports.edit = function (req, res) {
    res.render('admin/index', { title: '内容管理' });
 }

 exports.addView = function (req, res) {
    res.render('admin/index', { title: '内容管理' });
 }