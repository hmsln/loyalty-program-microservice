//list of statuses
const statuses = [
	{
		name: 'bronze',
		nRidesThreshold: 0,
		multiplier: 1
	},
	{
		name: 'silver',
		nRidesThreshold: 3,
		multiplier: 3
	},
	{
		name: 'gold',
		nRidesThreshold: 5,
		multiplier: 5
	},
	{
		name: 'platinum',
		nRidesThreshold: 10,
		multiplier: 10
	}
];

const getStatusByName = function (name) {
	
	for (let i = 0; i < statuses.length; i++) {
		if (name === statuses[i].name) {
			return statuses[i];
		}
	}
	
	throw new Error('no_status_found');
}

const getStatusByNRides = function (nRides) {
	
	for (let i = 0; i < statuses.length - 1; i++) {
		if (nRides >= statuses[i].nRidesThreshold && nRides < statuses[i + 1].nRidesThreshold) {
			return statuses[i];
		}
	}
	
	return statuses[statuses.length - 1];
}

const getNextStatus = function (nRides) {
	
	for (let i = 0; i < statuses.length - 1; i++) {
		if (nRides >= statuses[i].nRidesThreshold && nRides < statuses[i + 1].nRidesThreshold) {
			return statuses[i + 1];
		}
	}
	
	return 'Your current status is the highest possible.';
}

module.exports = {
	getStatusByName: getStatusByName,
	getStatusByNRides: getStatusByNRides,
	getNextStatus: getNextStatus
}