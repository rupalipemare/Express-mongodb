'use strict';
var users = require('./../model/users.js');
var  passport = require('passport'),
    local = require('passport-local').Strategy;
var user;

module.exports = function(){
    passport.use(new local({
        usernameField : 'username',
        passwordField : 'password'
    }, function(username, password, done){
        var data = {
            'username' : username,
            'password' : password
        };
        users.verifyUser(data, function (err, user) {
            if(err){
                console.log(err);
            }/*else{
                var user = user;
                done(err, user);
            }*/
            if(user == null){
                done(null, false, { message : 'Invalid Password'});
            }else{
                user = user;
                done(err, user);
            }
        });
    }));
};
