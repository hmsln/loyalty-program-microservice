var config = {
    "mongoUrl": process.env.IS_ON_AWS == undefined ? 'mongodb://app2:whatpeoplesaw@ds147900.mlab.com:47900/enriched-chat' : process.env.MONGO_URL
}

module.exports = config;
