const express = require("express");
const mongoose = require("mongoose");

const api = require("./routes/");

const app = express();

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use("/api", api);
