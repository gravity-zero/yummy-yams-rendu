database = db.getSiblingDB("bakery")

var pastriesData = cat('/docker-entrypoint-initdb.d/pastries.json');

// Parse the JSON data
var pastries = JSON.parse(pastriesData);

// Insert the data into the pastries collection
database.insertMany(pastries);