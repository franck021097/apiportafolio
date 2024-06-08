const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Form = sequelize.define('Form', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Form;
