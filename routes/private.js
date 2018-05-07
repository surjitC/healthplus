const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('User');
const Product = mongoose.model('Products');

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
            let productId = request.body["product-id"];
            let itemToBeDeleted = request.body["delete-item"];
            
            if (productId) {
                let foundInCart = false;
                for (let i = 0; i < userCart.length; i ++) {
                    if (userCart[i].item == productId) {
                        foundInCart = true;
                        console.log("FOUND IN CART");
                        console.log(userCart[i]);
                        userCart[i].quantity += 1;
                        userCart[i].price += Number(userCart[i].price);
                    }
                }
                
                if (!foundInCart) {
                    Product.findOne({
                        _id: productId
                    }).then((foundProduct) => {
                        console.log("NOT FOUND IN CART");
                        console.log(foundProduct);
                        userCart.push({
                            "item": productId,
                            "quantity": 1,
                            "price": Number(foundProduct.price)
                        });
                        user.cart = userCart;
                        return user.save();
                    }).catch((err) => {
                        console.log(err);
                        throw err;
                    });
                } else {
                    user.cart = userCart;
                    return user.save();    
                }
            } else if (itemToBeDeleted) {
                console.log("ITEM TO BE DELETED");
                console.log(itemToBeDeleted);
                for(let i = 0; i < userCart.length; i ++) {
                    console.log("ITEM BEING CHECKED");
                    console.log(userCart[i].item);
        
                    if (userCart[i].item == itemToBeDeleted) {
                        userCart.splice(i, 1);
                    }
                }
                user.cart = userCart;
                return user.save();
            }
        } else {
            throw new Error("invalid user");
        }
    }).then((savedUser) => {
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
                console.log("PRICE OF ITEM");
                console.log(userCart[i].price);
                total += Number(userCart[i].price);
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