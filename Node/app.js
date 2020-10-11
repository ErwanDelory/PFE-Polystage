const express = require("express");

const app = express();

var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "db", // notez comment on utilise le config que l'on a requiré
	user: "root",
	password: "root",
	database: "db",
	multipleStatements: true,
});

connection.connect();

app.get("/test", (req, res, next) => {
	connection.connect(function (err) {
		connection.query("SELECT * FROM eleves", function (err, result) {
			res.status(200).json({ data: result });
		});
	});
});

app.listen(5000); // start Node + Express server on port 5000
