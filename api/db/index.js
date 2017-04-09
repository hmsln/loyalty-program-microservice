//db has its own /config folder
const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = function () {
	
	mongoose.connect(config.mongoUrl);
	
	mongoose.connection.on('open', function () {
		console.log('Connected to MongoDB');
	});
	
	mongoose.connection.on("error", function ( err ) {
      	console.log("Unable to connect to MongoDB");
    	process.exit(1);
    });
}