const express = require('express');
const nunjucks = require('nunjucks');
const nodemailer = require('nodemailer');
const methodOverride = require('method-override');
const SMTP_CONFIG = require('./config/smtp');

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method')); // antes das rotas smp

app.get('/', (request, response) => response.render('index.html'));

app.post('/', (request, response) => {
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

app.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
  express: app,
  autoescape: false,
  noCache: true,
});

app.listen(3333, () => { console.log('hello!'); });
