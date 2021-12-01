const express = require('express');
const router = express.Router();
const user = require('../models/User');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
require('./passportLocal')(passport);


function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/user/login');
    }
}



router.get('/login', (req, res) => {
    res.render("user/signin");
});

router.get('/signup', (req, res) => {
    res.render("user/register");
});

router.post('/signup', (req, res) => {
    // get all the values 
    const {username,email, password, confirmpassword } = req.body;
    var nameRegex = /^[a-zA-Z\-]+$/;
    // check if the are empty 
    if (!email || !username || !password || !confirmpassword) {
        res.render("logins/register", { err: "All Fields are Required !", csrfToken: req.csrfToken() });
    } else if(!username.match(nameRegex)){
        res.render("logins/register", { err: "This field can only contain letters", csrfToken: req.csrfToken() });

    }

    else if (password != confirmpassword) {

        res.render("logins/register", { err: "Password Don't Match !", csrfToken: req.csrfToken() });
    } else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }, { username: username }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("user/register", { err: "We're sorry,this email adress already exist. Please try a different email adress to register", csrfToken: req.csrfToken() });
            } else {
                // generate a salt
                bcryptjs.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    // hash the password
                    bcryptjs.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        // save user in db
                        user({
                            username: username,
                            email: email,
                            password: hash,
                            googleId: null,
                            provider: 'email',
                        }).save((err, data) => {
                            if (err) throw err;
                            // login the user
                            // use req.login
                            // redirect , if you don't want to login
                            req.flash('success_msg', 'Registration Completed Successfully ')
                            res.redirect('/user/login');
                        });
                    })
                });
            }
        });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/user/signin',
        successRedirect: '/',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});



// router.get('/profile', checkAuth, (req, res) => {
//     // adding a new parameter for checking verification
//     res.render('logins/profile', { username: req.user.username, verified : req.user.isVerified });

// });



module.exports = router;