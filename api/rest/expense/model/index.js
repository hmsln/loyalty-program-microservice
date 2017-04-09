const mongoose = require('mongoose');

const expenseSchema = {
	customerId: String,
	amount: Number,
	riding: Boolean
};

const Expense = mongoose.model('expense', expenseSchema);

/*
Perhaps some fields of Expense could be editable later on?
This is out of the scope of this project.
*/
const publicProperties = [];

//pass customer controller to Expense model, so it can make a customer spend money when a new expense is created
module.exports = function (customer) {
	//CRUD methods
	return {
		create: function (obj) {
			
			var newExpense = new Expense(obj);
			
			return customer.spend(obj.customerId, newExpense)
			.then(function (data) {
				return newExpense.save();
			}, function (err) {
				
			});
		},
		delete: function (id) {
			return Expense.remove({_id: id}).exec();
		},
		read: function (id) {
			return Expense.findById(id).exec();
		},
		update: function (id, update) {
			return Customer
			.findById(id)
			.exec()
			.then(function (e) {
			
				if (typeof update == 'function') {
					e = update(e);
				} else if (Object.prototype.toString.call(update) == '[object Object]') {
					for (var key in update) {
						if (publicProperties.indexOf(key) > - 1 && update.hasOwnProperty(key)) {
							e[key] = update[key];
						}
					}
				}

				return e.save();
			})
		}
	}
}