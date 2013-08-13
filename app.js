
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , admin = require('./routes/admin')
  , article = require('./routes/article')
  , upload = require('./routes/upload')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

//连接数据库
mongoose.connect('mongodb://localhost/panda_dev')

//chrome console.log
app.use(require('chromelogger').middleware);

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

app.get('/', routes.index);
app.get('/admin', admin.articles);

//article
app.get('/catalog/:id/add-article', article.addView);
app.post('/article', article.add);
app.get('/article/:id', article.view);
app.get('/article/:id/edit', article.editView);
app.post('/article/:id/edit', article.edit);

app.get('/node/:nodeName/edit', article.editNodeView);
app.post('/node/:nodeName/edit', article.editNode);

//upload
app.post('/upload/image', upload.image);

//front pages

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
