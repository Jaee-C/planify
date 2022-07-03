const express = require("express");

const authRouter = require("./auth");
const issueRouter = require("./issue");

const router = express.Router();

router.use("/auth", authRouter);
router.get("/hi", (req, res) => {return res.send("Helllo")});
router.use("/", issueRouter);

module.exports = router;