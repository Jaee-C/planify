var DataTypes = require("sequelize").DataTypes;
var _issue = require("./issue");
var _issue_assigned_to = require("./issue_assigned_to");
var _issue_type = require("./issue_type");
var _priority = require("./priority");
var _project = require("./project");
var _sprint = require("./sprint");
var _status = require("./status");
var _status_group = require("./status_group");
var _user = require("./user");

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

  project.belongsToMany(project, { as: 'project_lead_projects', through: sprint, foreignKey: "project_id", otherKey: "project_lead" });
  project.belongsToMany(project, { as: 'project_id_projects', through: sprint, foreignKey: "project_lead", otherKey: "project_id" });
  sprint.belongsToMany(sprint, { as: 'project_lead_sprints', through: issue, foreignKey: "project_id", otherKey: "project_lead" });
  sprint.belongsToMany(sprint, { as: 'project_id_sprints', through: issue, foreignKey: "project_lead", otherKey: "project_id" });
  issue_assigned_to.belongsTo(issue, { as: "issue", foreignKey: "issue_id"});
  issue.hasMany(issue_assigned_to, { as: "issue_assigned_tos", foreignKey: "issue_id"});
  issue_assigned_to.belongsTo(issue, { as: "issue_project", foreignKey: "issue_project_id"});
  issue.hasMany(issue_assigned_to, { as: "issue_project_issue_assigned_tos", foreignKey: "issue_project_id"});
  issue_assigned_to.belongsTo(issue, { as: "issue_project_lead_issue", foreignKey: "issue_project_lead"});
  issue.hasMany(issue_assigned_to, { as: "issue_project_lead_issue_assigned_tos", foreignKey: "issue_project_lead"});
  issue.belongsTo(issue_type, { as: "issue_type", foreignKey: "issue_type_id"});
  issue_type.hasMany(issue, { as: "issues", foreignKey: "issue_type_id"});
  issue.belongsTo(priority, { as: "priority", foreignKey: "priority_id"});
  priority.hasMany(issue, { as: "issues", foreignKey: "priority_id"});
  priority.belongsTo(project, { as: "project", foreignKey: "project_id"});
  project.hasMany(priority, { as: "priorities", foreignKey: "project_id"});
  priority.belongsTo(project, { as: "project_lead_project", foreignKey: "project_lead"});
  project.hasMany(priority, { as: "project_lead_priorities", foreignKey: "project_lead"});
  sprint.belongsTo(project, { as: "project", foreignKey: "project_id"});
  project.hasMany(sprint, { as: "sprints", foreignKey: "project_id"});
  sprint.belongsTo(project, { as: "project_lead_project", foreignKey: "project_lead"});
  project.hasMany(sprint, { as: "project_lead_sprints", foreignKey: "project_lead"});
  status.belongsTo(project, { as: "project", foreignKey: "project_id"});
  project.hasMany(status, { as: "statuses", foreignKey: "project_id"});
  status.belongsTo(project, { as: "project_lead_project", foreignKey: "project_lead"});
  project.hasMany(status, { as: "project_lead_statuses", foreignKey: "project_lead"});
  issue.belongsTo(sprint, { as: "project", foreignKey: "project_id"});
  sprint.hasMany(issue, { as: "issues", foreignKey: "project_id"});
  issue.belongsTo(sprint, { as: "project_lead_sprint", foreignKey: "project_lead"});
  sprint.hasMany(issue, { as: "project_lead_issues", foreignKey: "project_lead"});
  issue.belongsTo(sprint, { as: "sprint", foreignKey: "sprint_id"});
  sprint.hasMany(issue, { as: "sprint_issues", foreignKey: "sprint_id"});
  issue.belongsTo(status, { as: "status", foreignKey: "status_id"});
  status.hasMany(issue, { as: "issues", foreignKey: "status_id"});
  status.belongsTo(status_group, { as: "category_status_group", foreignKey: "category"});
  status_group.hasMany(status, { as: "statuses", foreignKey: "category"});
  issue_assigned_to.belongsTo(user, { as: "assignee_user", foreignKey: "assignee"});
  user.hasMany(issue_assigned_to, { as: "issue_assigned_tos", foreignKey: "assignee"});
  project.belongsTo(user, { as: "lead_user", foreignKey: "lead"});
  user.hasMany(project, { as: "projects", foreignKey: "lead"});

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
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
