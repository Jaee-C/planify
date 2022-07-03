var DataTypes = require("sequelize").DataTypes;
var _Issue = require("./Issue");
var _IssueAssignedTo = require("./IssueAssignedTo");
var _IssueType = require("./IssueType");
var _Priority = require("./Priority");
var _Project = require("./Project");
var _Sprint = require("./Sprint");
var _Status = require("./Status");
var _StatusGroup = require("./StatusGroup");
var _User = require("./User");
var _UserInProject = require("./UserInProject");

function initModels(sequelize) {
  var Issue = _Issue(sequelize, DataTypes);
  var IssueAssignedTo = _IssueAssignedTo(sequelize, DataTypes);
  var IssueType = _IssueType(sequelize, DataTypes);
  var Priority = _Priority(sequelize, DataTypes);
  var Project = _Project(sequelize, DataTypes);
  var Sprint = _Sprint(sequelize, DataTypes);
  var Status = _Status(sequelize, DataTypes);
  var StatusGroup = _StatusGroup(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var UserInProject = _UserInProject(sequelize, DataTypes);

  Issue.belongsToMany(User, { as: 'user_id_users', through: IssueAssignedTo, foreignKey: "issue_id", otherKey: "user_id" });
  Project.belongsToMany(User, { as: 'user_id_user_user_in_projects', through: UserInProject, foreignKey: "project_id", otherKey: "user_id" });
  User.belongsToMany(Issue, { as: 'issue_id_issues', through: IssueAssignedTo, foreignKey: "user_id", otherKey: "issue_id" });
  User.belongsToMany(Project, { as: 'project_id_projects', through: UserInProject, foreignKey: "user_id", otherKey: "project_id" });
  IssueAssignedTo.belongsTo(Issue, { as: "issue", foreignKey: "issue_id"});
  Issue.hasMany(IssueAssignedTo, { as: "issue_assigned_tos", foreignKey: "issue_id"});
  Issue.belongsTo(IssueType, { as: "issue_type", foreignKey: "issue_type_id"});
  IssueType.hasMany(Issue, { as: "issues", foreignKey: "issue_type_id"});
  Issue.belongsTo(Priority, { as: "priority", foreignKey: "priority_id"});
  Priority.hasMany(Issue, { as: "issues", foreignKey: "priority_id"});
  Priority.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(Priority, { as: "priorities", foreignKey: "project_id"});
  Sprint.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(Sprint, { as: "sprints", foreignKey: "project_id"});
  Status.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(Status, { as: "statuses", foreignKey: "project_id"});
  UserInProject.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(UserInProject, { as: "user_in_projects", foreignKey: "project_id"});
  Issue.belongsTo(Sprint, { as: "project", foreignKey: "project_id"});
  Sprint.hasMany(Issue, { as: "issues", foreignKey: "project_id"});
  Issue.belongsTo(Sprint, { as: "sprint", foreignKey: "sprint_id"});
  Sprint.hasMany(Issue, { as: "sprint_issues", foreignKey: "sprint_id"});
  Issue.belongsTo(Status, { as: "status", foreignKey: "status_id"});
  Status.hasMany(Issue, { as: "issues", foreignKey: "status_id"});
  Status.belongsTo(StatusGroup, { as: "category_status_group", foreignKey: "category"});
  StatusGroup.hasMany(Status, { as: "statuses", foreignKey: "category"});
  IssueAssignedTo.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(IssueAssignedTo, { as: "issue_assigned_tos", foreignKey: "user_id"});
  UserInProject.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(UserInProject, { as: "user_in_projects", foreignKey: "user_id"});

  return {
    Issue,
    IssueAssignedTo,
    IssueType,
    Priority,
    Project,
    Sprint,
    Status,
    StatusGroup,
    User,
    UserInProject,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
