var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var Admin = require("./models/admin");

module.exports = function () {
    passport.serializeUser(function (admin, done) {
        done(null, admin._id);
    });

    passport.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, admin) {
            done(err, admin);
        });
    });

    passport.use("login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        Admin.findOne({ email: email }, function (err, admin) {
            if (err) { return done(err); }
            if (!admin) {
                return done(null, false, { message: "No user has that email!" });
            }
            admin.checkPassword(password, function (err, isMatch) {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(null, admin);
                } else {
                    return done(null, false, { message: "Invalid password" });
                }
            })
        });
    }));
}

