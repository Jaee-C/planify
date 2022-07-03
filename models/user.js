const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
}, { 
  tableName: "user",
  timestamps: false,
  initialAutoIncrement: 0,
  hooks: {
    beforeCreate: async (user) => {
     if (user.password) {
      const salt = await bcrypt.genSaltSync(10, 'a');
      user.password = bcrypt.hashSync(user.password, salt);
     }
    },
    beforeUpdate:async (user) => {
     if (user.password) {
      const salt = await bcrypt.genSaltSync(10, 'a');
      user.password = bcrypt.hashSync(user.password, salt);
     }
    }
  },
  instanceMethods: {
    validPassword: (password) => {
      return bcrypt.compareSync(password, this.password);
    }
  }
});

module.exports = User;