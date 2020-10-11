const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const config = require("./config");
const db = require("./mysqlConnect");

app.use(express.static("."));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

var routes = require("./api/routes/route"); //importing route
routes(app); //register the route

app.listen(config.node.port, function () {
	console.log("Serveur up on " + config.node.port);
});
