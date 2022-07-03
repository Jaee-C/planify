const express = require("express");

const controller = require("../controllers/issue");

const router = express.Router();

router.get("/issues", controller.getIssues);
// router.post("/issues", controller.createIssue);
// router.put("/issues/:id", controller.updateIssue);
// router.delete("/issues/:id", controller.deleteIssue);

module.exports = router;
