'use strict';
var mongodb = require('./../db.js'),
    express = require('express'),
    router = express.Router();

var db, collection, objectId;

// This middleware will execute before all routes
// middleware for connection db and a particular collection
router.use(function (request, response, next) {
    mongodb.connect(function (err) {
        if (err)
            console.log(err);
    });
    db = mongodb.getDb();
    collection = db.collection('category');
    objectId = mongodb.getObjectID();
    next();
});
router.get('/', function (request, response) {
    collection.find({}).toArray(function (err, results) {
        response.render('index', {'title': 'Welcome', 'subtitle': "Categories", 'collection': results});
        db.close();
    });
});

// Add Category View
router.get('/addCategory', function (request, response) {
    response.render('addCategory', {'title': 'Category', 'subtitle': "Add Category",});
});

// Add category to db
router.post('/addCategory', function (request, response) {
    var data = {
        'name': request.body.category
    };
    collection.insertOne(data, function (err, results) {
        if (err)
            console.log(err);
        db.close();
        response.redirect('/');
    });
});

// update category view
router.get('/updateCategory/:id', function (request, response) {
    var id = new objectId(request.params.id);
    collection.findOne({_id: id}, function (err, results) {
        if (err)
            console.log(err);
        db.close();
        response.render('updateCategory', {'title': 'Category', 'subtitle': 'Update Category', 'data': results});
    });
});

// update category info
router.post('/updateCategory', function (request, response) {
    var data = {'name': request.body.name};
    collection.updateOne({'_id': request.body.id}, request.body, function (err, result) {
        console.log(result);
        if (err)
            console.log(err);
        db.close();
        response.redirect('/');
    });
});
module.exports = router;
