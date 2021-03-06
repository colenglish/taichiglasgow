var _ = require('underscore');
var express = require("express");
var mongoose = require('mongoose');
var mongoStore = require('connect-mongodb');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

// Database
var db = mongoose.connect(process.env.MONGO_URI);

var models = require('./servermodels.js');
var MovementModel = models.MovementModel(db);
var UserModel = models.UserModel(db);

// Config
app.use(express.static(__dirname));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ store: mongoStore(db), secret: process.env.MONGO_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        UserModel.findOne({ 'username': profile.username }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                // create new user
                user = new UserModel({
                    name: profile.displayName,
                    email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
                    username: profile.username,
                    facebook: profile._json
                });
            } else {
                // refresh details
                user.displayName = profile.displayName;
                user.email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
                user.username = profile.username;
                user.facebook = profile._json;
            }

            user.save(function (err) {
                return done(err, user);
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserModel.findOne({ _id: id }, function (err, user) {
        done(err, user);
    });
});

// Conditional config based on value of process.env.NODE_ENV
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
    app.use(express.errorHandler());
});

var authorizeByRoles = function(roles) {
    return [
        function(req, res, next) {
            if (req.isAuthenticated() && req.user && _.contains(roles, req.user.role))
                next();
            else
                res.send(401, 'Unauthorized');
        }];
};

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect to logged in page (will set up client session).
        // TODO: Something with the access token?
        res.redirect('/#/logged-in');
    });

//Log out the current user
app.post('/logout', function(req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
});

app.get('/api/form/:name', authorizeByRoles(['user', 'admin']), function (req, res){
    return MovementModel.find({ 'formName': req.params.name }, function (err, movements) {
        if (!err) {
            var sortedMovements = _.sortBy(movements, function(movement) {
                return movement.position;
            })
            return res.send(sortedMovements);
        } else {
            return console.log(err);
        }
    });
});

app.get('/api/movement/:id', authorizeByRoles(['user', 'admin']), function (req, res){
    return MovementModel.findById(req.params.id, function (err, movement) {
        if (!err) {
            return res.send(movement);
        } else {
            return console.log(err);
        }
    });
});

app.get('/api/users', authorizeByRoles(['admin']), function (req, res){
    return UserModel.find(function (err, users) {
        if (!err) {
            return res.send(users);
        } else {
            return res.send(err);
        }
    });
});

app.get('/api/user', authorizeByRoles(['user', 'admin']),
    function(req, res) {
        return res.send(req.user._doc);
    });

// Launch server
var port = process.env.PORT; // Set in env vars via IDE config (debug), local .env (foreman), or heroku config (production)
app.listen(port, function() {
    console.log("Listening on " + port);
});