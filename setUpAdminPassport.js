var passportAdmin = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var Admin = require("./models/admin");

module.exports = function () {
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

