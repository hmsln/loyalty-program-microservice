const express = require('express');
const bodyParser = require('body-parser')
const app = express();

module.exports = app;

//open connection to db
require('./db')();

app.use(bodyParser.json());

//mount REST API
app.use('/rest', require('./rest'));