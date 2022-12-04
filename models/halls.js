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
    description: { type: String, required: true },
    image: { type: String, required: false, unique: false }
});

var Hall = mongoose.model("Hall", hallSchema);
module.exports = Hall;
