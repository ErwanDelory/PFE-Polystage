const config = require('./config');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port,
  multipleStatements: true,
});

db.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

global.db = db;

module.exports = db;
