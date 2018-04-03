var express = require('express');
var path = require('path');
var sequelize = require('sequelize');
//var favicon = require('static-favicon');
var User = require("./models/user");
var logger = require('morgan');
//var cookieSession = require("cookie-session");
var session_middleware = require("./middlewares/session");
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');
//var users = require('./routes/users');
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');

var app = express();

// app.use(cookieSession({
// 	name: "session",
// 	keys: ["llave-1", "llave-2"]
// }));

app.get('/logout',function(req, res){
    req.session = null;
    res.redirect('/');
  });

//var authenticateController = require('./controllers/authenticate-controller');

app.post('/api/authenticate', function(req, res){
	var user = User.findOne({
        where: {username: req.body.username, password: req.body.password}});
        //HACE LA MIGRATION PARA USERNAME ROBERTO
		if(user){
			req.session.user_id = user._id;
			res.redirect('/');
		} else {
			res.render('/login', {error: 'Usuario no encontrado, por favor intentelo nuevamente.'});
			console.log("Usuario no encontrado, por favor intentelo nuevamente.");
		}
	});

var registerController = require('./controllers/register-controller');

app.post('/api/register', registerController.register);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
//app.use(favicon());
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;