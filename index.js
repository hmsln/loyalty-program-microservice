const express = require('express');
const app = express();

//server for static ressources (front end)
app.use(express.static(__dirname + '/public'));

//we can presume the whole microservice has already been mounted on the /loyalty route
app.use('/api', require('./api'));

const port = process.env.PORT || 8000;
app.listen(port, function () {
	console.log('Server is listening on port ' + port);
});