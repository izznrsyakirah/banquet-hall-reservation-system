var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    //console.log("Hi, I'm on the start page");
    res.render("index");
});

router.get("/about", function(req, res){
    res.render("about");
})

router.get("/contact", function(req, res){
    res.render("contact");
})

router.get("/halls", function(req, res){
    res.render("halls");
})

router.get("/reservation", function(req, res){
    res.render("reservation");
})

module.exports = router;
