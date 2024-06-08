const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false, // Para desactivar el registro SQL en la consola
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
