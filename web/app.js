var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 5000;

// Routers
var nav = [
        {link: '/hot', text: 'Hot'},
        {link: '/favorites', text: 'Favorites'}
        ];

var hotRouter = require('./src/routes/hotRoutes')(nav);
var topRouter = require('./src/routes/topRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'easecentral'}));
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', '.ejs');

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/hot', hotRouter);
app.use('/', topRouter);

app.listen(port, function(err) {
    console.log('running on port ' + port);
});
