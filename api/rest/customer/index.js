const express = require('express');
const customer = require('./model');

//require status
const statusService = require('./status');

//CRUD methods + a spend method to update user's loyalty status when he/she spends money
module.exports = {
	create: function (obj) {
		return customer.create(obj);
	},
	delete: function (id) {
		return customer.delete(id);
	},
	read: function (id) {
		return customer.read(id)
		.then(function (c) {
			
			//data to return
			var toReturn = {};
			
			toReturn.customer = c;
			
			//getting next status name and number of rides to next status
			var nextStatus = statusService.getNextStatus(c.nRides);
			
			//check if user is at highest status
			if(nextStatus == 'none') {
				toReturn.nextStatus = {
					nextStatusName: 'none',
					nRidesToNextStatus: ''
				}
			} else {
				var nRidesToNextStatus = nextStatus.nRidesThreshold - c.nRides;
			
				toReturn.nextStatus = {
					nextStatusName: nextStatus.name,
					nRidesToNextStatus: nRidesToNextStatus
				};
			}
			
			return toReturn;
		});
	},
	spend: function (id, expense) {
		return customer.spend(id, expense);
	},
	update: function (id, update) {
		return customer.update(id, update);
	}
};