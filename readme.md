## Loyalty microservice

### Start the service
**Note:** I have left the URL of a mongoDB sandbox database that I control in `/api/db/config/index.js`,
so you do not have to set up your own database to test the service. I will change the database's
password a few days from now. You can also change the URL to connect to another database if you so prefer.

**Start with:**
```
npm install
npm start
```

Then navigate to http://localhost:8000/

### Summary
Stub for a microservice storing user's loyalty points, and attributing them statuses (bronze, silver, gold, platinum)
based on number of rides.

It comes with a minimal angularJS-based front-end for debugging purposes.

User can:
- create a profile
- spend money, specifying if this expense is for a ride or not
- check one's loyalty status
- check one's amount of loyalty point
- check one's rides count
- check the total amount of money one's spent
- check next loyalty status, and number of rides to get it

The statuses, and the number of rides it takes to reach them, are listed in `/api/rest/customer/status/index.js`.

Technologies used:
- database: MongoDB
- server: node.js (express, mongoose)
- front end: angularJS