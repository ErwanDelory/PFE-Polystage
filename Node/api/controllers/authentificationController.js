const db = require("../../mysqlConnect");
var sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

async function auth(req, res, next) {
	if (!req.body.email || !req.body.password) {
		return res.status(403).json({
			message: "Invalid Email/Password",
		});
	}

	let query = `SELECT * FROM eleves WHERE email = "${
		req.body.email
	}" AND mdp = "${sha256(req.body.password)}"`;

	db.query(query, (err, result) => {
		if (err) throw err;

		if (result.length > 0) {
			const token = jwt.sign(
				{
					id: result[0].id,
					username: result[0].email,
				},
				config.secret,
				{ expiresIn: "3 hours" }
			);
			return res.status(200).json({
				message: "Auth Ok.",
				token: token,
			});
		} else {
			return res.status(403).json({
				message: "Auth Fail.",
			});
		}
	});
}

async function test(req, res, next) {
	const users = [
		{
			id: 1,
			username: "test",
			password: "test",
			firstName: "Test",
			lastName: "User",
		},
	];

	const user = users.find(
		(u) => u.username === "test" && u.password === "test"
	);

	const token = jwt.sign({ sub: 6 }, config.secret, { expiresIn: "7d" });

	console.log(token);
	res.status(200).json({
		message: "Auth Ok.",
		data: token,
	});
}

exports.test = test;

exports.auth = auth;
