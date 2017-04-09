const express = require('express');
	
module.exports = function (customer) {
	
	const expense = require('./model')(customer);

	return {
		create: function (obj) {
			return expense.create(obj);
		},
		delete: function (id) {
			return expense.delete(id);
		},
		read: function (id) {
			return expense.read(id);
		},
		update: function (id, update) {
			return expense.update(id, update);
		}
	}
};