var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/demo';
var _db;
module.exports = {
    connect : function(){
        mongodb.connect(url, function (err, db) {
            if(err)
                console.log(err);
            _db = db;
    })},
    getDb : function(){
        return _db;
    },
    getObjectID : function () {
        return objectId;
    }
};
