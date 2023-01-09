let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.use(chaiHttp);
let should = chai.should();

let mongoose = require("mongoose");
let Contact = require('../models/contact');


/*
suite("Test sayHello server", function () {

    setup(function () {
        this.app = server.app;
    });

    test("Test GET /hello", function () {
        chai.request(this.app).get("/hello").end(function (error, response) {
            chai.assert.equal(response.status, 200, "Wrong response code");
            chai.assert.equal(response.text, "Hello from routes.js", "Wrong response msg");
        });
    });


    test("Test contact form submission", function () {
        chai.request(this.app).post("/addContact").end(function (error, response) {
            chai.assert.equal(response.status, 200, "Wrong response code");
            chai.assert.equal(response.text, "Hello from routes.js", "Wrong response msg");
        });
    });
});
*/

describe('Halls', () => {
    describe('/GET halls', () => {

        it('it should GET all the halls for User', (done) => {
            chai.request(server.app)
                .get('/halls')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                }).timeout(10000);;
        });

        it('it should GET all the halls for Admin', (done) => {
            chai.request(server.app)
                .get('/addHalls')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

    });
});

describe('Contacts', () => {
    describe('/GET contacts', () => {

        it('it should GET all the contacts for Admin', (done) => {
            chai.request(server.app)
                .get('/contactList')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

    });

    describe('/POST contacts', () => {

        it('it should POST a contact form by User', (done) => {
            let contact = {
                name: 'Test User',
                email: 'test@user.com',
                message: 'This is a test contact form message submission.',
                status: 'Awaiting'
            }
            chai.request(server.app)
                .post('/addContact')
                .send(contact)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.contact.should.have.property('name');
                    res.body.contact.should.have.property('email');
                    res.body.contact.should.have.property('message');
                    res.body.contact.should.have.property('status');
                    done();
                });
        });
    });

});

describe('Reservations', () => {
    describe('/GET reservations', () => {

        it('it should GET all the reservations for Admin', (done) => {
            chai.request(server.app)
                .get('/eventsList')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

    });
});
