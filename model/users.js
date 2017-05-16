var db = require('./../db.js');
var ObjectId = db.getObjectID();
var bcrypt = require('bcrypt');


module.exports = {
    findAll: function (cb) {
        var collection = db.getDb().collection('users');
        collection.find().toArray(function (err, results) {
            if (err) {
                console.log(err);
            } else {
                cb(err, results);
            }
        });
    },
    findUserById: function (data, cb) {
        var collection = db.getDb().collection('users');
        var id = new ObjectId(data);
        collection.findOne({_id: id}, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                cb(err, result);
            }
        });
    },
    verifyUser: function (data, cb) {
        var username = data.username;
        var password = data.password;
        var collection = db.getDb().collection('users');
        collection.findOne({
            username: username,
        }, function (err, result) {
            if(result == null){
                cb(null, false);
            }else {
                bcrypt.compare(password, result.password, function (err, passRes) {
                    if (passRes == true) {
                        var user = result;
                        cb(err, result);
                    } else {
                        cb(null, false);
                    }
                });
                /*if (result.password == password) {
                 var user = result;
                 cb(err, result);
                 } else {
                 cb(null, false);
                 }*/
            }
        });
    },
    addUser: function (data, cb) {
        var collection = db.getDb().collection('users');
        var saltRounds = 10;
        bcrypt.hash(data.password, saltRounds, function (err, hash) {
            if (err) {
                console.log(err);
            } else {
                // cb(err, hash);
                data.password = hash;
                console.log(data.password);
                collection.insertOne(data, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        cb(err, result);
                    }
                });
            }
        });
    },
    updateUser: function (data, cb) {
        var collection = db.getDb().collection('users');
        var id = new ObjectId(data.id);
        var data = {
            'username': data.username,
            'password': data.password
        };
        collection.updateOne({_id: id}, data, function (err, result) {
            if (err) {
                console.log("err " + err);
            } else {
                cb(err, result);
            }
        });
    },
};