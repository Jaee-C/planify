const express = require("express");

const authRouter = require("./auth");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/hi", (req, res) => {return res.send("Helllo")});

module.exports = router;