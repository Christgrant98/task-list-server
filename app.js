const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const port = 3000;

app.use(express.json());

app.use("/list", listViewRouter)

app.use("/edit-list", listEditRouter)

app.listen(port);

module.exports = { app, port };

