var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");

const SALT_FACTOR = 12;

var adminSchema = mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:false}
});



adminSchema.methods.checkPassword = function(guess, done){
    if(this.password != null){
        bcrypt.compare(guess, this.password, function(err, isMatch){
            done(err, isMatch);
        });
    }
}



var Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;