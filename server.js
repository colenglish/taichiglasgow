var express = require("express");
var mongoose = require('mongoose');
var mongoStore = require('connect-mongodb');
var _ = require('underscore');

var app = express();

// Database
var db;

// Config
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        store: mongoStore(db),
        secret: 'my test app secret'
    }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    db = mongoose.connect('mongodb://localhost/taichi_database');
});

app.configure('production', function(){
    app.use(express.errorHandler());
    db = mongoose.connect('mongodb://localhost/taichi_database');
});

var ClassModel = require('./servermodels.js').ClassModel(db);
var UserModel = require('./servermodels.js').UserModel(db);

function validateUserForRoles(req, res, next, allowedRoles){
    if (req.session && req.session.user_id) {
        UserModel.findById(req.session.user_id, function(user) {
            if (user && _.contains(allowedRoles, user.role)) {
                next();
            } else {
                res.writeHead(401, { 'Content-Type': 'text/html' });
                res.end();
            }
        });
    } else {
        res.writeHead(401, { 'Content-Type': 'text/html' });
        res.end();
    }
}

function validateAnyUser(req, res, next){
    validateUserForRoles(req, res, next, ['user', 'admin']);
}

function validateAdminUser(req, res, next){
    validateUserForRoles(req, res, next, ['admin']);
}

app.get('/api/classes', function (req, res){
    return ClassModel.find(function (err, classes) {
        if (!err) {
            return res.send(classes);
        } else {
            return console.log(err);
        }
    });
});

app.get('/api/classes/:id', function (req, res){
    return ClassModel.findById(req.params.id, function (err, classs) {
        if (!err) {
            return res.send(classs);
        } else {
            return console.log(err);
        }
    });
});

app.get('/api/users', validateAdminUser, function (req, res){
    return UserModel.find(function (err, users) {
        if (!err) {
            return res.send(users);
        } else {
            return res.send(err);
        }
    });
});

app.post('/api/users', validateAdminUser, function(req, res) {
    var user = new UserModel({
        username: req.body.username,
        password: req.body.password
    });
    user.save(function (err) {
        if (!err){
            req.session.user_id = user.__id;
            req.session.user_role = user.role;
            return res.send(user.__doc);
        }else {
            return res.send(err);
        }
    })
});

//Log in an existing user, starting a session
app.post('/api/login', function(req, res) {
    return UserModel.findOne({ username : req.body.username }, function (err, user) {
        if (!err) {
            if (user && user.authenticate(req.body.password)){
                req.session.user_id = user._doc._id;
                req.session.user_role = user._doc.role;
                return res.send(user._doc);
            } else {
                req.session.destroy();
                res.writeHead(401, { 'Content-Type': 'text/html' });
                res.end();
            }
        } else {
            return res.send(err);
        }
    });
});

//Log out the current user
app.post('/api/logout', function(req, res) {

    req.session.destroy();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end();

});

// Launch server
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});