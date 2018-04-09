const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

//const User = mongoose.model('User');
app.get("/welcome", (request, response) => {
    console.log(request.user);
    if (request.user) {
        response.status(200).render("private/welcome");
    } else {
        response.status(403).render("global/sorry");
    }
});

module.exports = app;