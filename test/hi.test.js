const chai = require("chai");
const request = require("supertest");
const expect = chai.expect();

const app = require("../server");

// Parent block
describe("GET /hi", () => {
  it("it should GET hi", (done) => {
    request(app)
      .get("/hi")
      .expect(200)
      .expect("Helllo")
      .end(err => {
        if (err) return done(err);
        done();
      })
  });
});
