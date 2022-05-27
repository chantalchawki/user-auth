const connect = require('./config/database');
const migration = require('./migration');

connect();
//migration.generateUsers();