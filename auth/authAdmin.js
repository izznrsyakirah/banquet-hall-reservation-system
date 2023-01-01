//middleware to check if user is logged in
var ensureAuthAdmin = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to view this page");
        res.redirect("/admin");
    }
}

module.exports = { ensureAuthenticated: ensureAuthAdmin }