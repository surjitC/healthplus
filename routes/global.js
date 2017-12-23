const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.render("global/landing");
});
app.get('/about', (req, res) => {
	res.render('global/about');
});
app.get('/login', (req, res) => {
	res.render('global/login');
});
app.get('/signup', (req, res) => {
	res.render('global/signup');
});

module.exports = app;