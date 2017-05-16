'use strict'
var express = require('express'),
    passport = require('./config/passport.js'),
    // middleware = require('./middleware/middleware.js'),
    bodyParser = require('body-parser'),
    cookieparser = require('cookie-parser'),
    session = require('express-session'),
    app = express();


var category = require('./routes/routes'),
    auth = require('./routes/index');
app.use(express.static(__dirname + '/public'));
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieparser());
app.use(session({
    secret: 'Site visit',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// passport(app);
app.set('view cache', false);
app.locals.clockData = { dateTime : new Date().toUTCString()};

// set routes
app.use('/category', category);
app.use('/', auth);


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