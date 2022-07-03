const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('issue_assigned_to', {
    issue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'issue',
        key: 'id'
      }
    },
    issue_project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'issue',
        key: 'project_id'
      }
    },
    issue_project_lead: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'issue',
        key: 'project_lead'
      }
    },
    assignee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'issue_assigned_to',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "issue_id" },
          { name: "issue_project_id" },
          { name: "issue_project_lead" },
          { name: "assignee" },
        ]
      },
      {
        name: "fk_issue_has_user_user1_idx",
        using: "BTREE",
        fields: [
          { name: "assignee" },
        ]
      },
      {
        name: "fk_issue_has_user_issue1_idx",
        using: "BTREE",
        fields: [
          { name: "issue_id" },
          { name: "issue_project_id" },
          { name: "issue_project_lead" },
        ]
      },
    ]
  });
};
