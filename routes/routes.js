var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    //console.log("Hi, I'm on the start page");
    res.render("user/index");
});

router.get("/about", function(req, res){
    res.render("user/about");
})

router.get("/contact", function(req, res){
    res.render("user/contact");
})

router.get("/halls", function(req, res){
    res.render("user/halls");
})

router.get("/reservation", function(req, res){
    res.render("user/reservation");
})

router.get("/login", function(req, res){
    res.render("admin/login");
})

//router.use("/", require("./admin"));


module.exports = router;
