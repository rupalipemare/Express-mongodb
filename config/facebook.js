'use strict';
var User = require('./../model/users.js'),
    passport = require('passport'),
    facebook = require('passport-facebook');

module.exports = function() {
    passport.use(new facebook({
            clientID: '292044337915473',
            clientSecret: 'be03baed269997f731c4c561f1072c16',
            callbackURL: "http://localhost:3000/auth/facebook/callback"
            // profileFields: ['emails']
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log(profile.id);
            User.findOrCreate({ facebookId: profile.id}, function (err, user) {
                console.log(user);
                if(err){
                    console.log(err);
                }
                return cb(err, user);
            });
        }
    ));
};
