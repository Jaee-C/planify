const { expect } = require("chai");
const char = require("chai");

const sequelize = require("../config/db");

describe("db", () => {
  it ("should connect to db", (done) => {
    sequelize.connect(function(err, result) {
      if(err){
          done(err);
          return;
      }
      done();
    });
  })
})
