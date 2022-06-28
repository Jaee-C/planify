const express = require("express");
const controller = require("../controllers/user");

const router = express.Router();

router.use("/login", controller.login);

module.exports = router;