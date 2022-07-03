const { models } = require("../config/db");

exports.getIssues = async (req, res, next) => {
  const issues = await models.Issue.findAll({
    include: {
      model: models.Project,
      required: true,
      include: {
        model: models.UserInProject,
        as: "user_in_projects",
        required: true,
      },
    },
    where: {
      '$Project->user_in_projects.user_id$': req.user.id,
    }
  });
  return res.json(issues);
}
