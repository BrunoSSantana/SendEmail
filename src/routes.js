const express = require('express');
const sendEmail = require('./app/controller/sendEmail');
const listUsers = require('./app/controller/listUsers');

const routes = express.Router();

routes.get('/', sendEmail.index);
routes.get('/users', listUsers.list);

routes.post('/', sendEmail.post);

module.exports = routes;
