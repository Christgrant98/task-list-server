const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const port = 3000;

const validarMetodoHTTP = (req, res, next) => {
  const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE'];

  if (metodosValidos.includes(req.method)) {
    next(); 
  } else {
    res.status(405).send('Método no permitido');
  }
};

app.use(express.json());
app.use(validarMetodoHTTP);

app.use("/list", listViewRouter)

app.use("/edit-list", listEditRouter)

app.listen(port);

module.exports = { app, port };

