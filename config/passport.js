var passport = require('passport'),
    session = require('express-session');
var local = require('./localstrategy.js');
var facebook = require('./facebook.js');
module.exports = function (app) {
    app.use(session({
        secret: 'Site visit',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    passport.deserializeUser(function(user, done){
        done(null, user);
    });
    local();
    facebook();
};