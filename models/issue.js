const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Issue', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sprint',
        key: 'project_id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'status',
        key: 'id'
      }
    },
    priority_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'priority',
        key: 'id'
      }
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resolutionDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estimate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sprint_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sprint',
        key: 'id'
      }
    },
    issue_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'issue_type',
        key: 'id'
      }
    },
    isArchived: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    archivedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    issueNum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'issue',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_issue_project1_idx",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "fk_issue_status1_idx",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
      {
        name: "fk_issue_priority1_idx",
        using: "BTREE",
        fields: [
          { name: "priority_id" },
        ]
      },
      {
        name: "fk_issue_sprint1_idx",
        using: "BTREE",
        fields: [
          { name: "sprint_id" },
          { name: "project_id" },
        ]
      },
      {
        name: "fk_issue_issue_type1_idx",
        using: "BTREE",
        fields: [
          { name: "issue_type_id" },
        ]
      },
    ]
  });
};
