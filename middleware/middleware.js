'use strict';
var passport = require('passport');

module.exports = {
    isLogin : function(request, response, next){
        if(request.session.user && request.path == '/login'){
            response.redirect('/home');
        }
        if(request.path == '/auth/facebook'){
            next();
        }
        if(!request.session.user && request.path != '/login'){
            response.redirect('/login');
        }else{
           next();
        }
    },
};