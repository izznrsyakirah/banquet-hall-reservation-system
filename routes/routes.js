var express = require("express");
var passport = require("passport");
var flash = require("connect-flash");

var Admin = require("../models/admin");
var Contact = require("../models/contact");
var Hall = require("../models/halls");
var Reservation = require("../models/reservation");

var ensureAuthenticated = require("../auth/auth").ensureAuthenticated;

var router = express.Router();

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");
    next();
});

/* ********************************************************Customer Routes ******************************************************/
router.get("/", function (req, res) {
    res.render("user/index");
});

router.get("/about", function (req, res) {
    res.render("user/about");
})

router.get("/contact", function (req, res) {
    res.render("user/contact");
})

router.get("/halls", function (req, res) {

    Hall.find().exec(function (err, halls) {
        if (err) { console.log(err); }

        res.render("user/halls", { halls: halls });
    });

})

router.get("/reservation", function (req, res) {

    Hall.find().exec(function (err, halls) {
        if (err) { console.log(err); }

        res.render("user/reservation", { halls: halls });
    });
})

router.get("/login", function (req, res) {
    res.render("admin/login");
});

/************************************************************** Admin Routes ******************************************************/
router.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

/* ******************************************************** Admin Login ******************************************************/
router.post("/login", passport.authenticate("login", {
    successRedirect: "/contactList",
    failureRedirect: "/login",
    failureFlash: true
}));

/* ******************************************************** View Contact List ******************************************************/
router.get("/contactList", ensureAuthenticated, function (req, res) {

    var sortBy = { submittedAt: -1 }; //{ name: 1 } ascending, { name: -1 } descending

    Contact.find().sort(sortBy).exec(function (err, contacts) {
        if (err) { console.log(err); }

        res.render("admin/pages/contactList", { contacts: contacts });
    });
});

/* ******************************************************** Admin View / Add Halls  ******************************************************/
router.get("/addHalls", ensureAuthenticated, function (req, res) {

    Hall.find().exec(function (err, halls) {
        if (err) { console.log(err); }

        res.render("admin/pages/addHalls", { halls: halls });
    });

});

/* ******************************************************** View Events List ******************************************************/
router.get("/eventsList", ensureAuthenticated, function (req, res) {

    var sortBy = { eventDate: 1 }; //{ name: 1 } ascending, { name: -1 } descending

    Reservation.find().sort(sortBy).exec(function (err, reservations) {
        if (err) { console.log(err); }

        res.render("admin/pages/eventsList", { reservations: reservations });
    });
});

/* ******************************************************** View Events in Calendar ******************************************************/
router.get("/calendar", ensureAuthenticated, function (req, res) {

    Reservation.find({}, { hallType: 1, eventDate: 1, eventTime: 1 }).exec(function (err, events) {
        if (err) { console.log(err); }

        res.render("admin/pages/calendar", { events: events });
    });

});

/*********************************************************** User Contact Form Submission **************************************************/
router.post("/addContact", function (req, res) {

    var newContact = new Contact({
        name: req.body.contactName,
        email: req.body.contactEmail,
        message: req.body.contactMessage,
        status: req.body.contactStatus
    });

    newContact.save(function (err, post) {
        if (err) { console.log(err); }
        res.redirect("/contact");
    });

});

/******************************************************* Contact Form Response Update **************************************************/
router.post("/updateContactList", ensureAuthenticated, async function (req, res) {

    const contact = await Contact.findById(req.body.contactId);

    contact.status = req.body.contactStatus;

    try {
        let updateContact = await contact.save();
        //console.log("updatecontact", updateContact);
        res.redirect("/contactList");
    } catch (err) {
        console.log("error occured");
        res.status(500).send(err);
    }

});

/******************************************************** Add Hall Form Submission **************************************************/
router.post("/manageHall", ensureAuthenticated, function (req, res) {

    var newHall = new Hall({
        name: req.body.hallName,
        seatingPlan: req.body.seatingPlan,
        hallType: req.body.hallType,
        capacity: req.body.hallCapacity,
        lightingSystem: req.body.lightingSystem,
        soundSystem: req.body.soundingSystem,
        buffet: req.body.buffet,
        priceFrom: req.body.priceFrom,
        priceTo: req.body.priceTo,
        description: req.body.hallDescription
    })

    newHall.save(function (err, post) {
        if (err) { console.log(err); }
        res.redirect("/addHalls");
    });

});

/******************************************************** Reservation Form Submission **************************************************/
router.post("/makeReservation", function (req, res) {

    var newReservation = new Reservation({
        title: req.body.personTitle,
        firstname: req.body.personFirstName,
        lastname: req.body.personLastName,
        nic: req.body.personNic,
        address: req.body.personAddress,
        contact: req.body.personContact,
        email: req.body.personEmail,
        hallType: req.body.hallType,
        eventDate: req.body.eventDate,
        eventTime: req.body.eventTime,
        status: req.body.eventStatus,
        message: req.body.optionalMessage,
    })

    newReservation.save(function (err, post) {
        if (err) { console.log(err); }
        res.redirect("/reservation");
    });

});

/******************************************************** View Reservation Details **************************************************/
router.get("/eventsList/:reservationId", ensureAuthenticated, function (req, res) {
    Reservation.findById(req.params.reservationId).exec(function (err, reservationDetails) {
        res.render("admin/pages/reservationDetail", { reservationDetails: reservationDetails });
    });
});

/******************************************************** Sort Reservation List **************************************************/
router.get("/eventsList/sort/:sortItem", ensureAuthenticated, function (req, res) {

    var sortItem = req.params.sortItem

    if (sortItem == 'eventDateAsc') {
        var sortBy = { eventDate: 1 }; //{ name: 1 } ascending, { name: -1 } descending
    } else if (sortItem == 'eventDateDesc') {
        var sortBy = { eventDate: -1 };
    } else if (sortItem == 'submittedDateAsc') {
        var sortBy = { submittedAt: 1 };
    } else if (sortItem == 'submittedDateDesc') {
        var sortBy = { submittedAt: -1 };
    } else if (sortItem == 'confirmed') {
        var filter = { "status": "Confirmed" }
    } else if (sortItem == 'onboarding') {
        var filter = { "status": "Onboarding" }
    } else if (sortItem == 'awaiting') {
        var filter = { "status": "Awaiting" }
    }

    Reservation.find(filter).sort(sortBy).exec(function (err, reservations) {
        res.render("admin/pages/eventsList", { reservations: reservations });
    });

});

/******************************************************** Sort Contact List **************************************************/
router.get("/contactList/sort/:item", ensureAuthenticated, function (req, res) {

    var item = req.params.item

    if (item == 'submittedDateAsc') {
        var sortBy = { submittedAt: 1 };
    } else if (item == 'submittedDateDesc') {
        var sortBy = { submittedAt: -1 };
    } else if (item == 'responded') {
        var filter = { "status": "Responded" }
    } else if (item == 'awaiting') {
        var filter = { "status": "Awaiting" }
    }

    Contact.find(filter).sort(sortBy).exec(function (err, contacts) {
        if (err) { console.log(err); }

        res.render("admin/pages/contactList", { contacts: contacts });
    });
});

/******************************************************** Edit Reservation Details Page **************************************************/
router.get("/eventsList/edit/:reservationId", ensureAuthenticated, function (req, res) {
    Reservation.findById(req.params.reservationId).exec(function (err, reservationDetails) {
        res.render("admin/pages/editReservationDetail", { reservationDetails: reservationDetails });
    });
});

/* ******************************************************** Update Reservation Details ******************************************************/
router.post("/eventsList/edit/:reservationId/update", ensureAuthenticated, async function (req, res) {
    const reservation = await Reservation.findById(req.body.reservationId);

    reservation.firstname = req.body.personFirstName;
    reservation.lastname = req.body.personLastName;
    reservation.nic = req.body.personNic;
    reservation.contact = req.body.personContact;
    reservation.email = req.body.personEmail;
    reservation.address = req.body.personAddress;
    reservation.eventDate = req.body.eventDate;
    reservation.eventTime = req.body.eventTime;
    reservation.message = req.body.optionalMessage;
    reservation.eventStatus = req.body.eventStatus;

    try {
        let saveReservation = await reservation.save();
        //console.log("savereservation", saveReservation);
        res.redirect("/eventsList/" + req.body.reservationId);
    } catch (err) {
        //console.log("Error occured");
        res.status(500).send(err);
    }
});

/*router.get("/eventsList/delete/:reservationId", ensureAuthenticated, async function (req, res) {
    const reservation = await Reservation.findById(req.body.reservationId);

    var deleteQry = { _id: reservation };
    Reservation.deleteOne(deleteQry, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.redirect("/eventsList");
    });

});*/

module.exports = router;
