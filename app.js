var express = require('express');
var path = require('path');
var sequelize = require('sequelize');
var DataTypes = sequelize.DataTypes;
//var favicon = require('static-favicon');
var User = require("./models/user")(sequelize, DataTypes);
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/logout',function(req, res){
    req.session = null;
    res.redirect('/');
  });

  var db = require('./db/models/index'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

//var authenticateController = require('./controllers/authenticate-controller');

function GetUser(userName){
    return User.findOne({
        where: {username: userName}
    });
}

app.post('/api/authenticate', function(req, res){
    
    GetUser(req.body.username).then(
            function(data)  {
                console.log('DATA: ', data)
                if(data && data.dataValues.password == req.body.password){
                var user = data.dataValues;

                profile = {
                        "UserName" : user.username,
                        "IsAdmin" : user.isAdmin,
                        "Mail" : user.email
                    }
                    res.status(200).send(profile);
                }
                else{
                    res.status(404).send("El usuario o la password son incorrectas.");
                }

    });
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