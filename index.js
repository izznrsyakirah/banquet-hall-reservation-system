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

/*********************************************************************************** */
let http = require("http");
let socketIo = require("socket.io");

let server = http.createServer(app);
let io = socketIo(server);

io.on("connection", function (socket) {

    socket.broadcast.emit("confirm connection", "Connected...");

    socket.on("onDatabaseChange", function (msg) {
        var delayInMilliseconds = 2000; //2 second

        setTimeout(function () {
            socket.broadcast.emit("refreshPage", "Refreshing Page");
        }, delayInMilliseconds);

    });

    socket.on("onHallChange", function (msg) {
        var delayInMilliseconds = 2000; //2 second

        setTimeout(function () {
            socket.broadcast.emit("refreshHallPage", "Refreshing Hall Page");
        }, delayInMilliseconds);

    });

    socket.on("onContactSubmission", function (msg) {
        var delayInMilliseconds = 2000; //2 second

        setTimeout(function () {
            socket.broadcast.emit("refreshContactListPage", "Refreshing Contact List Page");
        }, delayInMilliseconds);

    });

    socket.on("onReservationSubmission", function (msg) {
        var delayInMilliseconds = 2000; //2 second

        setTimeout(function () {
            socket.broadcast.emit("refreshReservationListPage", "Refreshing Contact List Page");
        }, delayInMilliseconds);

    });

});

/*********************************************************************************** */

mongoose.connect(params.DATABASECONNECTION, {});

setUpPassport();

app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

var cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(routes);

server.listen(app.get("port"), () => {
    console.log("Now listening on port " + app.get("port"));
});


module.exports.app = app;