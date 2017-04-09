const express = require('express');
const app = express();

module.exports = app;

//mount customer routes
const customer = require('./customer');
app.use('/customer', require('./routes/customer')(customer));

/*
mount expense routes, passing customer controller as parameter so customers can be updated
when spending money
*/
const expense = require('./expense')(customer);
app.use('/expense', require('./routes/expense')(expense));