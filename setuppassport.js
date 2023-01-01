var passport = require("passport");
var passportAdmin = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var Admin = require("./models/admin");
var User = require("./models/user");

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use("user", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: "No user has that email!" });
            }
            user.checkPassword(password, function (err, isMatch) {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Invalid password" });
                }
            })
        });
    }));


    /**************************************************************************************************** */
    passportAdmin.serializeUser(function (admin, done) {
        done(null, admin._id);
    });

    passportAdmin.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, admin) {
            done(err, admin);
        });
    });

    passportAdmin.use("admin", new LocalStrategy({
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

