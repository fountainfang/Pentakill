const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming 'app.js' exports your Express app instance

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/getEvents', () => {
    it('should get a list of events', (done) => {
        chai.request(app)
            .get('/api/getEvents')
            .end((err, res) => {
                // Check response status code
                expect(res).to.have.status(200);

                // Check response body
                expect(res.body).to.be.an('array'); // Assuming the response is an array of events
                expect(res.body.length).to.be.greaterThan(0); // Expecting at least one event

                // Optionally, add more specific assertions based on the structure of the response
                // Example: Assuming each event has 'eventName', 'eventCategory', etc.
                const firstEvent = res.body[0];
                expect(firstEvent).to.have.property('eventName').that.is.a('string');
                expect(firstEvent).to.have.property('eventCategory').that.is.a('string');
                // Add more assertions for other properties as needed

                done();
            });
    });
});

// Run the test with Mocha
