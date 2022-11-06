var mongoose = require("mongoose");

var hallSchema = mongoose.Schema({
    name: { type: String, required: true },
    seatingPlan: { type: String, required: true },
    hallType: { type: String, required: true },
    capacity: { type: Number, required: true },
    lightingSystem: { type: String, required: true },
    soundSystem: { type: String, required: true },
    buffet: { type: String, required: true },
    priceFrom: { type: Number, required: true },
    priceTo: { type: Number, required: true },
    submittedAt: { type: Date, default: Date.now },
    description: { type: String, required: true }
});

var Hall = mongoose.model("Contact", hallSchema);
module.exports = Contact;
