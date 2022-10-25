var express = require("express");
var passport = require("passport");
var flash = require("connect-flash");

var Admin = require("../models/admin");

var router = express.Router();

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");
    next();
});


router.get("/", function (req, res) {
    //console.log("Hi, I'm on the start page");
    res.render("user/index");
});

router.get("/about", function (req, res) {
    res.render("user/about");
})

router.get("/contact", function (req, res) {
    res.render("user/contact");
})

router.get("/halls", function (req, res) {
    res.render("user/halls");
})

router.get("/reservation", function (req, res) {
    res.render("user/reservation");
})

router.get("/login", function (req, res) {
    res.render("admin/login");
});

router.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));


//router.use("/", require("./admin"));


module.exports = router;
