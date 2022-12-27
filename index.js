var express = require('express');
var path = require("path");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
const bodyParser = require('body-parser');

var params = require("./params/params");
var routes = require("./routes/routes");
var setUpPassport = require("./setuppassport");

var app = express();
mongoose.connect(params.DATABASECONNECTION, {});
setUpPassport();

app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "lsd64fkbs345alnkf55sdkbj",
    resave: false,
    saveUninitialized: false
}));

app.use("/uploads", express.static(path.resolve(__dirname, 'uploads')))
app.use(express.static(path.join(__dirname, 'statics')));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(routes);

app.listen(app.get("port"), () => {
    console.log("Now listening on port " + app.get("port"));
});
