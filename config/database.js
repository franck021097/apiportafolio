require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a PostgreSQL');
  } catch (error) {
    console.error('Error de conexión:', error);
  }
};

module.exports = { sequelize, connectDB };
