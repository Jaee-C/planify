/**
 * Testing for User Authentication Endpoints
 */
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../server");
const User = require("../models/user");
const constants = require("../utils/constants");

const dbHandler = require("./db-handler");

/**
 * Connect to the test database
 */
before(function (done) {
  dbHandler.connect();
  done();
});

describe("User Authentication", function () {
  // Test user signup endpoint
  describe("POST /api/auth/signup", function () {
    it("should create a new user", function (done) {
      const email = "admin@admin.com";
      const password = "admin";

      request(app)
        .post("/api/auth/signup")
        .send({ email, password })
        .expect("Location", "/login")
        .expect(constants.HTTP_OK)
        .end((err, res) => {
          if (err) return done(err);

          User.findOne({ email }).then((user) => {
            expect(user).to.exist;
            expect(user.password).not.to.be(password);
          });
          done();
        });
    });

    it("should return BAD_REQUEST if user already exists", function (done) {
      const email = "admin@admin.com";
      const password = "exist";

      request(app)
        .post("/api/auth/signup")
        .send({ email, password })
        .expect(constants.HTTP_BAD_REQUEST)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // Test user login endpoint
  describe("POST /api/auth/login", function () {
    it("should login a user", function (done) {
      const email = "admin@admin.com";
      const password = "admin";

      request(app)
        .post("/api/auth/login")
        .send({ email, password })
        .expect(constants.HTTP_OK)
        .expect('Location', '/')
        .end(done);
    });

    it("should return 401 if user does not exist", function (done) {
      const email = "weird@mail.com";
      const password = "weird";

      request(app)
        .post("/api/auth/login")
        .send({ email, password })
        .expect(constants.HTTP_UNAUTHORIZED)
        .end(done);
    });

    it ("should return 401 if password is incorrect", function (done) {
      const email = "admin@admin.com";
      const password = "weird";

      request(app)
        .post("/api/auth/login")
        .send({ email, password })
        .expect(constants.HTTP_UNAUTHORIZED)
        .end(done);
      });
  });
});

/**
 * Remove and close the db 
 */
 after(function (done) {
  dbHandler.closeDatabase();
  done();
});
