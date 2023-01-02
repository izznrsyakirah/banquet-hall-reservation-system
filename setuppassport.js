var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var Admin = require("./models/admin");
var User = require("./models/user");

function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
}

module.exports = function () {

    passport.serializeUser(function (userObject, done) {
        // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
        let userGroup = "model1";
        let userPrototype = Object.getPrototypeOf(userObject);

        if (userPrototype === User.prototype) {
            userGroup = "user";
        } else if (userPrototype === Admin.prototype) {
            userGroup = "admin";
        }

        let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
        done(null, sessionConstructor);
    });

    passport.deserializeUser(function (sessionConstructor, done) {

        if (sessionConstructor.userGroup == 'user') {
            User.findOne({
                _id: sessionConstructor.userId
            }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
                done(err, user);
            });
        } else if (sessionConstructor.userGroup == 'admin') {
            Admin.findOne({
                _id: sessionConstructor.userId
            }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
                done(err, user);
            });
        }

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

    passport.use("admin", new LocalStrategy({
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

/*
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
*/