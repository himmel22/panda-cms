
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , admin = require('./routes/admin')
  , article = require('./routes/article')
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
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/admin', admin.articles);
app.get('/catalog/:id/add-article', article.addView);
app.get('/article', article.add);
app.get('/article/:id', article.view);
app.get('/article/:id/edit', article.editView);
app.put('/article/:id/edit', article.edit);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
