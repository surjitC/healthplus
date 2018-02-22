const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.render("global/landing");
});
app.get('/medicines', (req, res) => {
	res.render('global/medicines');
});
app.get('/dietsNsupplements', (req, res) => {
	res.render('global/dietsNsupplements');
});
app.get('/bodycare', (req, res) => {
	res.render('global/bodycare');
});
app.get('/healthNfitness', (req, res) => {
	res.render('global/healthNfitness');
});
app.get('/yogatrainer', (req, res) => {
	res.render('global/yogatrainer');
});
app.get('/personaltrainer', (req, res) => {
	res.render('global/personaltrainer');
});
app.get('/homemasseur', (req, res) => {
	res.render('global/homemasseur');
});
app.get('/hometesting', (req, res) => {
	res.render('global/hometesting');
});
app.get('/ambulance', (req, res) => {
	res.render('global/ambulance');
});
app.get('/nearbyhospitals', (req, res) => {
	res.render('global/nearbyhospitals');
});
app.get('/blog', (req, res) => {
	res.render('global/blog');
});
app.get('/testimonials', (req, res) => {
	res.render('global/testimonials');
});
app.get('/contactus', (req, res) => {
	res.render('global/contactus');
});
app.get('/about', (req, res) => {
	res.render('global/about');
});
app.get('/login', (req, res) => {
	res.render('global/login');
});

module.exports = app;