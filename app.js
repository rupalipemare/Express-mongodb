'use strict';
var express = require('express'),
    passport = require('./config/passport.js'),
    bodyParser = require('body-parser'),
    cookieparser = require('cookie-parser'),
    session = require('express-session'),
    fileupload = require('express-fileupload'),
    flash = require('connect-flash'),
    db = require('./db.js'),
    app = express();

var index = require('./routes/index');
app.use(express.static(__dirname + '/public'));
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieparser());
app.use(fileupload());
app.use(session({
    secret: 'Site visit',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false , maxAge: 6000000}
}));
app.use(flash());
passport(app);
app.set('view cache', false);
app.locals.clockData = { dateTime : new Date().toUTCString()};

// set routes
app.use('/', index);

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/demo', function(err){
    if(err){
        console.log(err);
        process.exit(1)
    }else{
        console.log('connected');
    }
});

app.use(function(req, res, next) {
    res.locals.message = req.flash();
    next();
});
// This middleware will execute after routes
// middleware for not found
app.use(function (request, response) {
    response.send('Oops !!! Not Found');
});
// error handler middleware
app.use(function(err, request, response, next){
    response.send('OOPS Error occured ' + err);
});

//starting the server on port
app.listen(3000);