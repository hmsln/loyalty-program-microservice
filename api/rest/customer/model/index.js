const mongoose = require('mongoose');
const statusService = require('../status');

//define mongoose schema
const customerSchema = {
	name: String,
	globalId: String,
	spent: Number,
	nRides: Number,
	nPoints: Number,
	status: String
};

const Customer = mongoose.model('customer', customerSchema);

//properties that can be updated via the model's interface:
const publicProperties = ['name'];

module.exports = {
	//CRUD methods + getNRides
	create: function (obj) {
	
		var newCustomer = new Customer(obj);

		newCustomer.status = 'bronze';
		
		newCustomer.spent = 0;
		newCustomer.nRides = 0;
		newCustomer.nPoints = 0;
		
		return newCustomer.save();
	},
	delete: function (id) {
		return Customer.remove({_id: id}).exec();
	},
	read: function (id) {
		return Customer.findById(id).exec();
	},
	getNRides: function (id) {
		return Customer.findById(id, 'nRides').exec();
	},
	spend: function (id, expense) {
		
		return this.update(id, function(customer) {
			
			var multiplier = statusService.getStatusByName(customer.status).multiplier;
			customer.spent += expense.amount;
			customer.nPoints += (expense.amount * multiplier);
			
			if (expense.riding) {
				customer.nRides++;
			}
			
			customer.status = statusService.getStatusByNRides(customer.nRides).name;
			
			return customer;
		});
	},
	update: function (id, update) {
		return Customer
		.findById(id)
		.exec()
		.then(function (c) {

			if (typeof update == 'function') {
				c = update(c);
			} else if (Object.prototype.toString.call(update) == '[object Object]') {
				for (var key in update) {
					if (publicProperties.indexOf(key) > - 1 && update.hasOwnProperty(key)) {
						c[key] = update[key];
					}
				}
			}
			
			return c.save();
		})
		.catch(function (err) {
			
		});
	}
}