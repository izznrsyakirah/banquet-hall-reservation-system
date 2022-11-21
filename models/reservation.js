var mongoose = require("mongoose");

var reservationSchema = mongoose.Schema({
    title: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nic: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    email: { type: String, required: true },
    hallType: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventTime: { type: String, required: true },
    status: { type: String, required: true },
    message: { type: String, required: false },
    submittedAt: { type: Date, default: Date.now }
});

var Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
