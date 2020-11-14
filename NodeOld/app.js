const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');

const HttpError = require("./api/models/http-error");

const routes = require("./api/routes/route.js");
//const db = require("./mysqlConnect");
const config = require("./config");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
	// CORS POLICY
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

	next();
});

app.use("/api", routes);

app.use((res, req, next) => {
  const error = new HttpError("Could not find this route", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

const db = mysql.createConnection({
   host: config.mysql.host,
   user: config.mysql.user,
   password: config.mysql.password,
   database: config.mysql.database,
   port: config.mysql.port,
   multipleStatements: true,
 });

db.connect(error => {
   if (error) throw error;
   console.log("Successfully connected to the database.");
 });

global.db = db;

app.listen(config.node.port, function () {
	console.log("Serveur up on " + config.node.port);
});
