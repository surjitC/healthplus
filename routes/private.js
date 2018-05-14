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
app.post("/profile", (request, response) => {
    if (!request.user) {
        return response.status(403).redirect('login');
    }
    let userId = request.user._id;
    User.findOne({
        _id: userId
    }).exec(function(err, founduser) {
        if (err) {
            console.log(err);
        } else {
            if (request.body.firstName) {
                founduser.firstName = request.body.firstName;
            }
            if (request.body.lastName) {
                founduser.lastName = request.body.lastName;
            }
            if (request.body.email) {
                founduser.email = request.body.email;
            }
            if (request.body.contact) {
                founduser.contact = request.body.contact;
            }
            if (request.body.address) {
                founduser.address = request.body.address;
            }
            if (request.body.pincode) {
                founduser.pincode = request.body.pincode;
            }
            if (request.body.gender) {
                founduser.gender = request.body.gender;
            }

            founduser.save(function(err, updatedobject) {
                if (err) {
                    console.log(err);
                } else {
                    response.render("private/profile");
                }
            });
        }
    });
});

app.get('/editProfile', (request, response) => {
    if (!request.user) {
        return response.status(403).redirect('login');
    }

    return response.render('private/editprofile');
});

app.post('/editProfile', (request, response) => {
    if (!request.user) {
        return response.status(403).redirect('login');
    }

    let {contact, address, pincode, gender} = request.body;

    User.findOne({
        _id: request.user._id
    }).then((currentUser) => {
        if (contact) {
            currentUser.contact = contact;
        }
        if (address) {
            currentUser.address = address;
        }
        if (pincode) {
            currentUser.pincode = pincode;
        }
        if (gender) {
            currentUser.gender = gender;
        }

        return currentUser.save();
    }).then(savedUser => {
        return response.status(200).redirect('profile');
    }).catch(err => {
        console.log(err);
        return response.redirect(500).redirect('login');
    })
})

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
                for (let i = 0; i < userCart.length; i++) {
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
                for (let i = 0; i < userCart.length; i++) {
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
            for (let i = 0; i < userCart.length; i++) {
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

app.get('/checkout', (request, response) => {
    if (!request.user) {
        return response.status(403).redirect('login');
    }

    return response.status(200).render('private/checkout');
});

app.post('/checkout', (request, response) => {
    if (!request.user) {
        return response.status(403).redirect('login');
    }

    let userId = request.user._id;
    User.findOne({
        _id: userId
    }).populate('cart.item').exec((err, userWithCart) => {
        if (err) {
            console.log(err);
            return response.status(500).redirect('login');
        }
        if (userWithCart) {
            let cart = userWithCart.cart;
            let history = userWithCart.history;

            for (let i = 0; i < cart.length; i++) {
                let historyDocument = {
                    date: new Date().toISOString(),
                    price: cart[i].price,
                    quantity: cart[i].quantity,
                    item: cart[i].item
                };
                history.push(historyDocument);
            }

            if (cart.length > 0) {
                cart = [];
                userWithCart.cart = cart;
                userWithCart.history = history;
                userWithCart.save().then((savedUser) => {
                    return response.status(200).redirect('profile');
                }).catch(err => {
                    console.log(err);
                    return response.status(500).redirect('profile');
                });
            }
        }
    });
});

module.exports = app;