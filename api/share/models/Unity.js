const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const Unity = database.define('Unity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  abrev: {
    type: DataTypes.STRING,
    allowNull: false
  },
  decimal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  timestamps: true,
  paranoid: true
});  

module.exports = Unity;