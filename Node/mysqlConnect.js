const config = require("./config");
const mysql = require("mysql");

var db = mysql.createConnection({
	host: config.mysql.host, // notez comment on utilise le config que l'on a requiré
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database,
	multipleStatements: true,
});
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("Connected to database");
});
global.db = db;

module.exports = db;
