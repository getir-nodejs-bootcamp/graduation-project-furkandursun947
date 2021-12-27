const mongoose = require("mongoose");
const request = require("supertest");
const assert = require("assert");
const app = require("../app");



// Since we only have one test file, we can connect to the database directly. Otherwise we should connect different databases since jest runs each test file asynchronously.
// before starting tests, connect to the database
beforeAll((done) => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@challenge-xzwqd.mongodb.net/${process.env.DB_NAME}?retryWrites=true`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, ()=>done());
});


// Right now, it simply test two request. One of them is a valid body and the other is not valid. These tests can be increased such as wrong data in field(joi validations) and so on.
describe('Records endpoint', () => {
    
    // Valid body, succesful request
    it("Posts the records endpoint, valid body", function(done){
        request(app)
        .post("/records")
        .send({
            startDate: "2016-01-26",
            endDate: "2018-02-02",
            minCount: 2700,
            maxCount: 3000 
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.code === 1 || response.body.code === 0)
            done();
        })
        .catch(err => {
            console.log("Error => ",err)
        })
    })

    // Unvalid body field, unsuccesful request
    it("Posts the records endpoint, unvalid body", function(done){
        request(app)
        .post("/records")
        .send({
            startDate: "2016-01-26",
            endDate: "2018-02-02",
            minCountBroken: 2700,
            maxCount: 3000 
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
            done();
        })
        .catch(err => {
            console.log("Error => ",err)
        })
    })

})




// close the database connection after all tests are finished
afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});








module.exports = app