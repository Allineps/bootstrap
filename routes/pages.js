const express = require('express');
const authController = require("../controllers/auth");

const Router = express.Router();

Router.get('/', authController.isLoggedIn, (req, res) => {
    res.render("index")
});

Router.get('/login', authController.isLoggedIn, (req, res) => {
    res.render("login")
});

Router.get('/index', authController.isLoggedIn, (req, res) => {
    res.render("index")
});

Router.get('/profile', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render("profile")
    } else {
        res.render("login");
    }
})

Router.get('/contact', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render("contact")
    } else {
        res.render("login");
    }
})

Router.get('/cv', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render("cv")
    } else {
        res.render("login");
    }
})
Router.get('/skills', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render("skills")
    } else {
        res.render("login");
    }
})
Router.get('/register', authController.isLoggedIn, (req, res) => {
    res.render("register")
});



module.exports = Router;
