const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method')); // antes das rotas smp
app.use(routes);

app.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
  express: app,
  autoescape: false,
  noCache: true,
});

app.listen(3333, () => { console.log('hello!'); });
