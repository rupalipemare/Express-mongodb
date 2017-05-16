'use strict';
var users = require('./../model/users.js');
var passport = require('passport');

module.exports = {
    index: function (request, response) {
        users.findAll(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                response.render('userList', {'title': 'Welcome', 'subtitle': "Users List", 'user': result});
            }
        });
    },
    home: function (request, response) {
        response.render('home', {'title': 'Home', 'subtitle': 'Welcome Home'});
    },
    login: function (request, response) {
        response.render('login', {'title': 'Welcome', 'subtitle': "Auth"});
    },
    addUserView: function (request, response) {
        response.render('addUser', {'title': 'Welcome', 'subtitle': "Add User"});
    },
    addUser: function (request, response) {
        users.addUser(request.body, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                // login the new signed user using passport
                var data = {
                    username : result.ops[0].username,
                    password: result.ops[0].password
                }
                request.login(data, function () {
                    response.redirect('/home');
                });
            }
        });
    },
    updateUserView: function (request, response) {
        users.findUserById(request.params.id, function (err, result) {
            response.render('updateUser', {'title': 'Welcome', 'subtitle': "Update", 'user': result});
        });
    },
    updateUser: function (request, response) {
        users.updateUser(request.body, function (err, result) {
            response.redirect('/');
        });
    },
    uploadPicView: function (request, response) {
        response.render('upload', {'title': 'Home', 'subtitle': 'Welcome Home'});
    },
    uploadPic: function (request, response) {
        if (!request.files)
            return request.status(400).send('No files were uploaded.');
        var sampleFile = request.files.profile;
        sampleFile.mv('./public/profile/' + sampleFile.name, function (err) {
            if (err)
                return response.status(500).send(err);
            response.redirect('/');
        });
    },
};