const config = require("./config");
const mysql = require("mysql");

const db = mysql.createConnection({
	host: config.mysqlHost,
	port: config.mysqlPort,
	user: config.mysqlLogin,
	password: config.mysqlPassword,
	database: config.mysqlDatabase,
	multipleStatements: true,
});
db.connect();

module.exports = db;
