'use strict';
var userController =  require('./../controller/index.js'),
    middleware = require('./../middleware/middleware.js'),
    passport = require('passport'),
    express = require('express'),
    router = express.Router();

router.use(middleware.isLogin);
router.get('/', userController.index);
router.get('/home', userController.home);
router.get('/login', userController.login);
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            req.session.user = req.user;
            return res.redirect('/home');
        });
    })(req, res, next);

})
/*router.post('/login', passport.authenticate('local', {
    failureRedirect : '/login',
    successRedirect: '/home',
    failureFlash : true,
    session : true
}));*/
router.get('/auth/facebook',passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/auth/facebook'
    }), function(err, request, response) {
        if(err){dd
            console.log(err);
        }
        console.log("hrere in call res" +response);
        response.redirect('/home');
    });
router.get('/addUserView', userController.addUserView);
router.post('/addUser', userController.addUser);
router.get('/updateUser/:id', userController.updateUserView);
router.post('/updateUser', userController.updateUser);
router.get('/uploadPic', userController.uploadPicView);
router.post('/uploadPic', userController.uploadPic);

module.exports = router;