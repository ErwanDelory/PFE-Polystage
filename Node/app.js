const express = require("express");
const app = express();
const jwt = require("./api/jwt");
const errorHandler = require("./api/controllers/errorHandler");
const routes = require("./api/routes/route.js");
const config = require("./config");
const configToken = require("./api/config.json");
const HttpError = require("./api/model/http-error");

// body-parser permet de récupérer facilement les données passées en POST
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
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
app.use(jwt());
app.use("/api", routes);

app.use(errorHandler);
app.listen(config.node.port, function () {
	console.log("Serveur up on " + config.node.port);
});
