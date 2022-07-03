var DataTypes = require("sequelize").DataTypes;
var _issue = require("./Issue");
var _issue_assigned_to = require("./IssueAssignedTo");
var _issue_type = require("./IssueType");
var _priority = require("./Priority");
var _project = require("./Project");
var _sprint = require("./Sprint");
var _status = require("./Status");
var _status_group = require("./StatusGroup");
var _user = require("./User");
var _user_in_project = require("./UserInProject");

function initModels(sequelize) {
  var issue = _issue(sequelize, DataTypes);
  var issue_assigned_to = _issue_assigned_to(sequelize, DataTypes);
  var issue_type = _issue_type(sequelize, DataTypes);
  var priority = _priority(sequelize, DataTypes);
  var project = _project(sequelize, DataTypes);
  var sprint = _sprint(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);
  var status_group = _status_group(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_in_project = _user_in_project(sequelize, DataTypes);

  issue.belongsToMany(user, { as: 'user_id_users', through: issue_assigned_to, foreignKey: "issue_id", otherKey: "user_id" });
  project.belongsToMany(user, { as: 'user_id_user_user_in_projects', through: user_in_project, foreignKey: "project_id", otherKey: "user_id" });
  user.belongsToMany(issue, { as: 'issue_id_issues', through: issue_assigned_to, foreignKey: "user_id", otherKey: "issue_id" });
  user.belongsToMany(project, { as: 'project_id_projects', through: user_in_project, foreignKey: "user_id", otherKey: "project_id" });
  issue_assigned_to.belongsTo(issue, { as: "issue", foreignKey: "issue_id"});
  issue.hasMany(issue_assigned_to, { as: "issue_assigned_tos", foreignKey: "issue_id"});
  issue.belongsTo(issue_type, { as: "issue_type", foreignKey: "issue_type_id"});
  issue_type.hasMany(issue, { as: "issues", foreignKey: "issue_type_id"});
  issue.belongsTo(priority, { as: "priority", foreignKey: "priority_id"});
  priority.hasMany(issue, { as: "issues", foreignKey: "priority_id"});
  priority.belongsTo(project, { as: "project", foreignKey: "project_id"});
  project.hasMany(priority, { as: "priorities", foreignKey: "project_id"});
  sprint.belongsTo(project, { as: "project", foreignKey: "project_id"});
  project.hasMany(sprint, { as: "sprints", foreignKey: "project_id"});
  status.belongsTo(project, { as: "project", foreignKey: "project_id"});
  project.hasMany(status, { as: "statuses", foreignKey: "project_id"});
  user_in_project.belongsTo(project, { as: "project", foreignKey: "project_id"});
  project.hasMany(user_in_project, { as: "user_in_projects", foreignKey: "project_id"});
  issue.belongsTo(sprint, { as: "project", foreignKey: "project_id"});
  sprint.hasMany(issue, { as: "issues", foreignKey: "project_id"});
  issue.belongsTo(sprint, { as: "sprint", foreignKey: "sprint_id"});
  sprint.hasMany(issue, { as: "sprint_issues", foreignKey: "sprint_id"});
  issue.belongsTo(status, { as: "status", foreignKey: "status_id"});
  status.hasMany(issue, { as: "issues", foreignKey: "status_id"});
  status.belongsTo(status_group, { as: "category_status_group", foreignKey: "category"});
  status_group.hasMany(status, { as: "statuses", foreignKey: "category"});
  issue_assigned_to.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(issue_assigned_to, { as: "issue_assigned_tos", foreignKey: "user_id"});
  user_in_project.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_in_project, { as: "user_in_projects", foreignKey: "user_id"});

  return {
    issue,
    issue_assigned_to,
    issue_type,
    priority,
    project,
    sprint,
    status,
    status_group,
    user,
    user_in_project,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
