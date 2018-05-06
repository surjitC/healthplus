const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('User');

app.get("/welcome", (request, response) => {
    console.log(request.user);
    if (request.user) {
        response.status(200).render("private/welcome");
    } else {
        response.status(403).render("global/sorry");
    }
});

app.post('/cart', (request, response) => {
    if (!request.user) {
        return response.status(403).redirect('login');
    }

    let userId = request.user._id;
    User.findOne({
        _id: userId
    }).then((user) => {
        if (user) {
            let userCart = user.cart;
            console.log("USERCART BEFROR PUSH");
            console.log(userCart);
            let productId = request.body["product-id"];
            userCart.push({
                "item": productId
            });
            console.log("USERCART AFTER PUHS");
            console.log(userCart);
            user.cart = userCart;
            return user.save();
        } else {
            throw new Error("invalid user");
        }
    }).then((savedUser) => {
        console.log("USER SAVED");
        console.log(savedUser);
        console.log(savedUser.cart);
        return response.status(200).redirect('cart');
    }).catch((err) => {
        console.log(err);
        return response.status(403).redirect('login');
    });
});

app.get('/cart', (request, response) => {
    if (!request.user) {
        return response.status(403).redirect('login');
    }

    let userId = request.user._id;
    User.findOne({
        _id: userId
    }).populate('cart.item').exec((err, userWithCart) => {
        if (err) {
            return response.status(500).redirect('login');
        }
        if (userWithCart) {
            let userCart = userWithCart.cart;
            let total = 0;
            for (let i = 0; i < userCart.length; i ++) {
                total += Number(userCart[i].item.price);
            }
            
            if (isNaN(total)) {
                return response.status(500).send("Something went wrong with your cart. Please contact support support@healthplus.com");
            }

            return response.status(200).render('private/cart', {
                userCart: userWithCart.cart,
                total: total
            });
        }
    });
});

module.exports = app;