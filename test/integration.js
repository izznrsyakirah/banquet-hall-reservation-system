let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.use(chaiHttp);
let should = chai.should();

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

/*describe('User', function () {
    it("Test contact form submission",
        async () => {
            const response = await chai.request(server.app)
                .post('/addContact')
                .send({
                    name: 'franklin Isaiah',
                    email: 'franklin@user.com',
                    message: 'This is a test contact form message submission.',
                    status: 'Awaiting'
                });
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(201);
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('name');
            expect(response.body.data).to.have.property('email');
            expect(response.body.data).to.have.property('message');
            expect(response.body.data).to.have.property('status');
        },
    );
});*/

//Hello from routes.js

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
                });
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

    /*describe('/POST contacts', () => {

        it('it should POST a contact form by User',
            async () => {
                const response = await chai.request(server.app)
                    .post('/addContact')
                    .send({
                        name: 'Test User',
                        email: 'test@user.com',
                        message: 'This is a test contact form message submission.',
                        status: 'Awaiting',
                    });
                expect(response.body).to.be.an('object');
                expect(response.body.status).to.equal(201);
                expect(response.body.data).to.have.property('id');
                expect(response.body.data).to.have.property('name');
                expect(response.body.data).to.have.property('email');
                expect(response.body.data).to.have.property('message');
                expect(response.body.data).to.have.property('status');
            });

    });*/
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

