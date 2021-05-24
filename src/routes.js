const express = require('express');
const sendEmail = require('./app/controller/sendEmail');

const routes = express.Router();

routes.get('/', sendEmail.index);

routes.post('/', sendEmail.post);

module.exports = routes;
