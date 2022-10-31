var express = require("express");
var passport = require("passport");
var flash = require("connect-flash");

var Admin = require("../models/admin");
var Contact = require("../models/contact");

var ensureAuthenticated = require("../auth/auth").ensureAuthenticated;

var router = express.Router();

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");
    next();
});

/* ********************************************************Customer Routes ******************************************************/
router.get("/", function (req, res) {
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

/************************************************************** Admin Routes ******************************************************/
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

router.get("/contactList", function (req, res) {
    Contact.find().exec(function (err, contacts) {
        if (err) { console.log(err); }

        res.render("admin/pages/contactList", { contacts: contacts });
    });
});

router.get("/addHalls", ensureAuthenticated, function (req, res) {
    res.render("admin/pages/addHalls");
});

router.get("/eventsList", ensureAuthenticated, function (req, res) {
    res.render("admin/pages/eventsList");
});

router.get("/calendar", ensureAuthenticated, function (req, res) {
    res.render("admin/pages/calendar");
});

/*********************************************************** Contact Form Submission **************************************************/
router.post("/addContact", function (req, res) {

    var newContact = new Contact({
        name: req.body.contactName,
        email: req.body.contactEmail,
        message: req.body.contactMessage,
        status: req.body.contactStatus
    });

    newContact.save(function (err, post) {
        if (err) { console.log(err); }
        res.redirect("/contact");
    });
});

module.exports = router;
