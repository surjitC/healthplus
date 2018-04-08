'use strict'

//----------PACKAGES-------------
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

//---------FILES-----------
require('./models/Users');
const User = mongoose.model('User');
const globalRoutes = require('./routes/global');
const privateRoutes = require('./routes/private');
const config = require('./config');



//---------DB-Configuration---------
mongoose.connect(config.dbUrl, (err) => {
    if (err) {
        console.log('Unable to connect');
    } else {
        console.log('connected to db');
    }
})

//-----------PASSPORT-AUTH---------
passport.use(
    new googleStrategy({
            clientID: config.googleClientID,
            clientSecret: config.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({
                googleID: profile.id
            }).then((existingUser) => {
                if (existingUser) {
                    console.log('Already have the user');
                    done(null, existingUser);
                } else {
                    let user = new User();
                    user.googleID = profile.id;
                    user.save().then(user => {
                        console.log('profile id saved : ', user.googleID);
                        done(null, user);
                    }).catch((err) => {
                        console.error(err);
                    });
                }
            }).catch((err) => {
                console.error(err);
                done(err);
            })
        })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

//-----------MIDDLEWARE------------
app.use(morgan('dev'));
app.use('/', express.static('public'));
app.use('/login', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, callback) => {
    res.locals.user = req.user;
    callback();
});
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
// app.use(
// 	cookieSession({
// 		maxAge: 30 * 24 *60 * 60 * 1000,
// 		keys: [config.cookieKey]
// 	})
// );

//---------ROUTES-----------
app.use(globalRoutes);
app.use(privateRoutes);

//----------LISTENING-----------
app.listen(config.PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`App running on port ${config.PORT}`);
});