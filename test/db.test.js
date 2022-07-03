const { expect } = require("chai");
const char = require("chai");

const connection = require("../config/db");

describe.only("db", () => {
  it ("should connect to db", (done) => {
    connection.connect(function(err, result) {
      if(err){
          done(err);
          return;
      }
      done();
    });
  })
})
