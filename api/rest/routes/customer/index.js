const express = require('express');
const app = express();

const fail = function (err) {
	res.status(500);
	res.end();
}

//define routes for CRUD methods

module.exports = function (customer) {
	
	app.post('/', function (req, res, next) {
    	customer.create(req.body)
		.then(function (data) {
			res.json(data);
      		res.end();
		}, fail);
    });
    
	
	app.delete('/:id', function (req, res, next) {
		customer.delete(req.params.id)
		.then(function (data) {
			res.json({nDeleted: data.result.n});
			res.end();
		}, fail)
	});
	
	
	app.get('/:id', function (req, res, next) {
		customer.read(req.params.id)
		.then(function (data) {
			res.json(data);
			res.end();
		}, fail)
	});
	
	
	app.patch('/:id', function (req, res, next) {
		return customer.update(req.params.id, req.body)
		.then(function (data) {
			res.json(data);
			res.end();
		}, fail);
	});
	
	return app;
}