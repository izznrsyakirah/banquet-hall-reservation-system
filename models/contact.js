var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, required: false } /* Awaiting, Responded */
});

var Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
