/**
 * Testing for User Authentication Endpoints
 */
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../server");
const User = require("../models/user");

// Set up connection to database
let mongoose = require("mongoose");
require("dotenv").config();

before(function(done) {
  mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
  done();
});

describe("User Authentication", function() {
  describe ("POST /api/auth/signup", function() {
    it ("should create a new user", function(done) {
      const email = "admin@admin.com";
      const password = "admin";
      
      request(app)
        .post("/api/auth/signup")
        .send({ email, password })
        .expect(res => {
          expect(res.headers['x-auth']).to.exist;
          expect(res.body._id).to.exist;
          expect(res.body.email).to.be(email);
        })
        .end(err => {
          if (err) return done(err);
          
          User.findOne({ email }).then(user => {
            expect(user).to.exist;
            expect(user.password).not.to.be(password);
          });
        });
    });

    it ("should return 401 if user already exists", function(done) {
      const email = "existing@email.com";
      const password = "exist";

      request(app)
        .post("/api/auth/signup")
        .send({ email, password })
        .expect(401)
        .end(err => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe ("POST /api/auth/login", function() {
    it ("should login a user", function(done) {
      const email = "admin@admin.com";
      const password = "admin";

      request(app)
        .post("/api/auth/login")
        .send({ email, password })
        .expect(200)
        .end((err, res) => {
          expect(res.headers.location).to.be.equal("/");
          return done();
        });
    });
  });

  it ("should return 401 if user does not exist", function(done) {
    const email = "weird@mail.com";
    const password = "weird";

    request(app)
      .post("/api/auth/login")
      .send( {email, password })
      .expect(401)
      .end(err => {
        if (err) return done(err);
        return done();
      });
  });
});
