const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

// const Product = mongoose.model('Products');
const Product = require('../models/Products');
const Service = require('../models/Services');


app.get('/', (req, res) => {
    res.render("global/landing");
});

app.get('/medicines', (req, res) => {
    let products = new Product();
    Product.find({
        category: "medicines"
    }).exec(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/medicines', {
                products: products
            });
        }

    });
});
app.get('/medicines/:id', (req, res) => {
    console.log("my product", req.params.id);
    let product = new Product();
    Product.findOne({
        _id: req.params.id
    }).exec(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/productpage', {
                product: product
            });
        }
    });
});
app.get('/dietsNsupplements', (req, res) => {
    let products = new Product();
    Product.find({
        category: "dietsNsupplements"
    }).exec(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/dietsNsupplements', {
                products: products
            });
        }

    });
});
app.get('/dietsNsupplements/:id', (req, res) => {
    console.log("my product", req.params.id);
    let product = new Product();
    Product.findOne({
        _id: req.params.id
    }).exec(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/productpage', {
                product: product
            });
        }
    });
});
app.get('/bodycare', (req, res) => {
    let products = new Product();
    Product.find({
        category: "bodycare"
    }).exec(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/bodycare', {
                products: products
            });
        }

    });
    console.log(products);
});
app.get('/bodycare/:id', (req, res) => {
    console.log("my product", req.params.id);
    let product = new Product();
    Product.findOne({
        _id: req.params.id
    }).exec(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/productpage', {
                product: product
            });
        }
    });
});
app.get('/healthNfitness', (req, res) => {
    let products = new Product();
    Product.find({
        category: "healthNfitness"
    }).exec(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/healthNfitness', {
                products: products
            });
        }

    });
});
app.get('/healthNfitness/:id', (req, res) => {
    console.log("my product", req.params.id);
    let product = new Product();
    Product.findOne({
        _id: req.params.id
    }).exec(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/productpage', {
                product: product
            });
        }
    });
});
app.get('/yogatrainer', (req, res) => {
    let services = new Service();
    Service.find({
        category: "yogatrainer"
    }).exec(function(err, services) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/yogatrainer', {
                services: services
            });
        }

    });
});
app.get('/yogatrainer/:id', (req, res) => {
    console.log("my service", req.params.id);
    let service = new Service();
    Service.findOne({
        _id: req.params.id
    }).exec(function(err, service) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/servicepage', {
                service: service
            });
        }
    });
});
app.get('/personaltrainer', (req, res) => {
    let services = new Service();
    Service.find({
        category: "personaltrainer"
    }).exec(function(err, services) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/personaltrainer', {
                services: services
            });
        }

    });
});
app.get('/personaltrainer/:id', (req, res) => {
    console.log("my service", req.params.id);
    let service = new Service();
    Service.findOne({
        _id: req.params.id
    }).exec(function(err, service) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/servicepage', {
                service: service
            });
        }
    });
});
app.get('/homemasseur', (req, res) => {
    let services = new Service();
    Service.find({
        category: "homemasseur"
    }).exec(function(err, services) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/homemasseur', {
                services: services
            });
        }

    });
});
app.get('/homemasseur/:id', (req, res) => {
    console.log("my service", req.params.id);
    let service = new Service();
    Service.findOne({
        _id: req.params.id
    }).exec(function(err, service) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/servicepage', {
                service: service
            });
        }
    });
});
app.get('/hometesting', (req, res) => {
    let services = new Service();
    Service.find({
        category: "hometesting"
    }).exec(function(err, services) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/hometesting', {
                services: services
            });
        }

    });
});
app.get('/hometesting/:id', (req, res) => {
    console.log("my service", req.params.id);
    let service = new Service();
    Service.findOne({
        _id: req.params.id
    }).exec(function(err, service) {
        if (err) {
            console.log(err);
        } else {
            res.render('global/servicepage', {
                service: service
            });
        }
    });
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
    if (req.user) {
        return res.status(200).redirect('/profile');
    }
    return res.render('global/login');
});
app.get('/signup', (req, res) => {
    res.render('global/signup');
});
app.get("/sorry", (req, res) => {
    res.render('global/sorry');
});
app.get('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        res.redirect('/');
    } else {
        res.redirect('/sorry');
    }
});
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/sorry'
    })
);
module.exports = app;