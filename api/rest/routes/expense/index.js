const express = require('express');
const app = express();

const fail = function (err) {
	res.status(500);
	res.end();
}
		
//define routes for CRUD methods
		
module.exports = function (expense) {
	
	app.post('/', function (req, res, next) {
    	expense.create(req.body)
		.then(function (data) {
			res.json(data);
			res.end();
		}, fail);
    });
	
	
	app.delete('/:id', function (req, res, next) {
		expense.delete(req.params.id)
		.then(function (data) {
			res.json({n: data.result.n});
			res.end();
		}, fail)
	});
	
	
	app.get('/:id', function (req, res, next) {
		expense.read(req.params.id)
		.then(function (data) {
			res.json(data);
			res.end();
		}, fail)
	});
	
	
	app.patch('/:id', function (req, res, next) {
		return expense.update(req.params.id, req.body)
		.then(function (data) {
			res.json(data);
			res.end();
		}, fail);
	});
	
	return app;
}