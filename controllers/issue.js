const { models } = require("../config/db");

exports.getIssues = async (req, res, next) => {
  const issues = await models.issue.findAll();
  return res.json(issues);
}