const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('../../config/smtp');
const User = require('../model/User');

module.exports = {

  index(request, response) { response.render('index.njk'); },

  async post(request, response) {
    await User.create(request.body);

    const { email, name } = request.body;

    console.log(email);
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
        to: email,
      });
    }

    run();
    return response.redirect('/users');
  },
};
