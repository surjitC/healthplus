'use strict'

//----------PACKAGES-------------
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const passport = require('passport');
const mongoose = require('mongoose');

//---------FILES-----------
const globalRoutes = require('./routes/global');
const config = require('./config');

//---------DB-Configuration---------
mongoose.connect(config.dbUrl, (err) => {
	if (err) {
		console.log('Unable to connect');
	} else {
		console.log('connected to db');
	}
})

//-----------MIDDLEWARE------------
app.use(morgan('dev'));
app.use('/', express.static('public'));
app.use('/login', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized: true, secret: 'fjalksyeiroa' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, callback) => {
	res.locals.user = req.user;
	callback();
});
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

//---------ROUTES-----------
app.use(globalRoutes);

//----------LISTENING-----------
app.listen(8080, (err) => {
	if(err) {console.log(err);}
	console.log("App running on port 8080");
});
