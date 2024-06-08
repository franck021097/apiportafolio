require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const { connectDB } = require('../config/database');
const Form = require('../models/Form');
const app = express();

// Conectar a la base de datos
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/form', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newForm = await Form.create({ name, email });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: 'Nuevo registro recibido',
      text: `Se ha recibido un nuevo registro.\n\nNombre: ${name}\nCorreo electrónico: ${email}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo');
      } else {
        console.log('Correo enviado:', info.response);
        res.status(200).send(`Datos guardados y correo enviado: Nombre - ${name}, Correo electrónico - ${email}`);
      }
    });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).send('Error al guardar los datos');
  }
});

module.exports = app;
