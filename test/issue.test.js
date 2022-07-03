/**
 * Test issues endpoints
 */
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../server");

describe.skip("Issues", function () {
  describe("GET /issues", function () {
    it("should return all issues", function (done) {
      request(app)
        .get("/issues")
        .expect(constants.HTTP_OK)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("array");

          // TODO: Check for correct data
          expect(res.body).to.have.length(0);
          done();
        });
    });
  });

  describe("POST /issues", function () {
    it("Should create a new issue", function (done) {
      request(app)
        .post("/issues")
        .send({
          title: "Test issue",
          description: "Test description",
          priority: "High",
          status: "Open",
        })
        .expect(constants.HTTP_OK)
        .end((err, res) => {
          // TODO: check for correct data
        })
    });

    it("Should return BAD_REQUEST if title is not filled", function (done) {
      request(app)
        .post("/issues")
        .send({
          description: "Test description",
          priority: "High",
          status: "Open",
        })
        .expect(constants.HTTP_BAD_REQUEST)
        .end((err, res) => {
          // TODO: check for correct data
        })
    });
  });
});
