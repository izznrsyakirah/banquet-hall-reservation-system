let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.use(chaiHttp);
let should = chai.should();

describe('Halls', () => {
    describe('/GET halls', () => {

        it('/halls - GET all halls for User', (done) => {
            chai.request(server.app)
                .get('/halls')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                }).timeout(10000);;
        });

        it('/halls/available/:hallId - GET specific hall for User', (done) => {
            let hallId = '63689a61e967f566c5bb3281'
            chai.request(server.app)
                .get('/halls/available/:' + hallId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/addHalls - GET all halls for Admin', (done) => {
            chai.request(server.app)
                .get('/addHalls')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/addHalls/edit/:hallId - GET specific hall for Admin', (done) => {
            let hallId = '63689a61e967f566c5bb3281'
            chai.request(server.app)
                .get('/addHalls/edit/:' + hallId)
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

        it('/contactList - GET all contacts for Admin', (done) => {
            chai.request(server.app)
                .get('/contactList')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/contactList/sort/:item - GET sorted contacts for Admin - Submitted Date Ascending', (done) => {
            let item = 'submittedDateAsc'
            chai.request(server.app)
                .get('/eventsList/sort/:' + item)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/contactList/sort/:item - GET sorted contacts for Admin - Submitted Date Descending', (done) => {
            let item = 'submittedDatDesc'
            chai.request(server.app)
                .get('/eventsList/sort/:' + item)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/contactList/sort/:item - GET sorted contacts for Admin - Responded', (done) => {
            let item = 'responded'
            chai.request(server.app)
                .get('/eventsList/sort/:' + item)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/contactList/sort/:item - GET sorted contacts for Admin - Awaiting', (done) => {
            let item = 'awaiting'
            chai.request(server.app)
                .get('/eventsList/sort/:' + item)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

    });

    /*describe('/POST contacts', () => {

        it('it should POST a contact form by User', (done) => {

            chai.request(server.app)
                .post('/addContact')
                .send({
                    name: 'Test User',
                    email: 'test@user.com',
                    message: 'This is a test contact form message submission.',
                    status: 'Awaiting'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    /*res.body.contact.should.have.property('name');
                    res.body.contact.should.have.property('email');
                    res.body.contact.should.have.property('message');
                    res.body.contact.should.have.property('status');*
                    done();
                });
        });
    });*/

});

describe('Reservations', () => {
    describe('/GET reservations', () => {

        it('/eventsList - GET all reservations for Admin', (done) => {
            chai.request(server.app)
                .get('/eventsList')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/eventsList/:reservationId - GET specific reservation for Admin (i)', (done) => {
            let reservationId = '63766f955c3eaeb2ea3481e4'
            chai.request(server.app)
                .get('/eventsList/:' + reservationId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/eventsList/edit/:reservationId - GET specific reservation for Admin (ii)', (done) => {
            let reservationId = '6371e3b7d5169169f63f7c1a'
            chai.request(server.app)
                .get('/eventsList/edit/:' + reservationId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/eventsList/sort/:sortItem - GET sorted reservations for Admin - Submitted Date Ascending', (done) => {
            let sortItem = 'submittedDateAsc'
            chai.request(server.app)
                .get('/eventsList/sort/:' + sortItem)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/eventsList/sort/:sortItem - GET sorted reservations for Admin - Submitted Date Descending', (done) => {
            let sortItem = 'submittedDateDesc'
            chai.request(server.app)
                .get('/eventsList/sort/:' + sortItem)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/eventsList/sort/:sortItem - GET sorted reservations for Admin - Event Date Descending', (done) => {
            let sortItem = 'eventDateAsc'
            chai.request(server.app)
                .get('/eventsList/sort/:' + sortItem)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/eventsList/sort/:sortItem - GET sorted reservations for Admin - Event Date Descending', (done) => {
            let sortItem = 'eventDateDesc'
            chai.request(server.app)
                .get('/eventsList/sort/:' + sortItem)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/eventsList/sort/:sortItem - GET sorted reservations for Admin - Confirmed', (done) => {
            let sortItem = 'confirmed'
            chai.request(server.app)
                .get('/eventsList/sort/:' + sortItem)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/eventsList/sort/:sortItem - GET sorted reservations for Admin - Onboarding', (done) => {
            let sortItem = 'onboarding'
            chai.request(server.app)
                .get('/eventsList/sort/:' + sortItem)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/eventsList/sort/:sortItem - GET sorted reservations for Admin - Awaiting', (done) => {
            let sortItem = 'awaiting'
            chai.request(server.app)
                .get('/eventsList/sort/:' + sortItem)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

        it('/eventsList/sort/:sortItem - GET sorted reservations for Admin - Cancelled', (done) => {
            let sortItem = 'cancelled'
            chai.request(server.app)
                .get('/eventsList/sort/:' + sortItem)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                });
        });

    });
});

describe('Account', () => {
    describe('/GET account', () => {

        it('/account - GET Account details for User', (done) => {
            chai.request(server.app)
                .get('/account')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                }).timeout(10000);;
        });

    });
});

describe('Calendar', () => {
    describe('/GET calendar', () => {

        it('/calendar - GET Calendar details for Admin', (done) => {
            chai.request(server.app)
                .get('/calendar')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.length.should.be.eql(0);

                    done();
                }).timeout(10000);;
        });

    });
});

