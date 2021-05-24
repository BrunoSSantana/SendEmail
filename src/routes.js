const express = require('express');
const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('./config/smtp');

const routes = express.Router();

routes.get('/', (request, response) => response.render('index.html'));

routes.post('/', (request, response) => {
  const { to, name } = request.body;
  console.log(to);
  console.log(name);

  const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.user,
      pass: SMTP_CONFIG.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  async function run() {
    await transporter.sendMail({
      text: 'Texto do Email',
      subject: 'Assunto do e-mail',
      from: 'Bruno Souza <brunoosouza15@gmail.com>',
      to: ['brunoosouza15@gmail.com', 'brunoosouzas@gmail.com'],
    });
  }

  run();
  return response.send();
});

module.exports = routes;
