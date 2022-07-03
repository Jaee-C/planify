const express = require("express");
const controller = require("../controllers/user");

const router = express.Router();

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.delete("/delete", controller.delete);

module.exports = router;