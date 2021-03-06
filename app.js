
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , admin = require('./routes/admin')
  , article = require('./routes/article')
  , node = require('./routes/node')
  , column = require('./routes/column')
  , share = require('./routes/share')
  , upload = require('./routes/upload')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

//连接数据库
mongoose.connect('mongodb://localhost/panda_dev')

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({hash: 'md5'}));
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

//set alert message
app.use(function(req, res, next) {
	res.locals.alert = req.session.alert;
	req.session.alert = null;
	next();
});

app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//error page
app.use(function(err, req, res, next){
	res.status(500);
	res.render('error', { error: err });
});


var auth = express.basicAuth('admin', 'admin');

/**
 * routes
 */
app.get('/', routes.index);
app.get('/admin', auth, admin.articles);

//article
app.get('/article/add', auth, article.addView);
app.post('/article', auth, article.add);
app.get('/article/:id', article.view);
app.get('/article/:id/edit', auth, article.editView);
app.post('/article/:id/edit', auth, article.edit);
app.get('/article/:id/delete', auth, article.delete);

app.get('/node/:nodeName', node.viewNode);
app.get('/node/:nodeName/edit', auth, node.editNodeView);
app.post('/node/:nodeName/edit', auth, node.editNode);

app.get('/column/:columnId', column.view);

//upload
app.post('/upload/ckimage', auth, upload.ckimage);
app.post('/upload/image', upload.image);

//front pages

//share pages
app.get('/share/:itemType', share.viewItemList);
app.get('/share/:itemType/:catalog', share.viewItemList);

app.all('/share/item/add/:itemType', auth, share.addItem);
app.all('/share/item/:id/edit', auth, share.editItem);
app.get('/share/item/:id/delete', auth, share.deleteItem);

app.get('/admin/share/:itemType', auth, share.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
