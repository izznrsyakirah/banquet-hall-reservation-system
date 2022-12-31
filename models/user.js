var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");

const SALT_FACTOR = 12;

var userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nic: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }
});

userSchema.methods.checkPassword = function (guess, done) {
    if (this.password != null) {
        bcrypt.compare(guess, this.password, function (err, isMatch) {
            done(err, isMatch);
        });
    }
}

var User = mongoose.model("user", userSchema);

module.exports = User;