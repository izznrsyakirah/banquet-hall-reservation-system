var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    //console.log("Hi, I'm on the start page");
    res.render("index");
});

router.get("/about", function(req, res){
    //console.log("Hi, I'm on the start page");
    res.render("about");
})

module.exports = router;
