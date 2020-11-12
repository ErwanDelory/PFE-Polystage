const db = require("../../mysqlConnect");
var sha256 = require("js-sha256");
const { sendError, sendMessage } = require("./message");

async function auth(req, res, next) {
	if (typeof req.body.email === "undefined")
		return sendError(res, "Vous n'avez pas envoyé la donnée email");

	if (typeof req.body.password === "undefined")
		return sendError(res, "Vous n'avez pas envoyé la donnée password");

	let query = `SELECT email,mdp FROM eleves WHERE email = "${req.body.email}"`;

	db.query(query, (err, result) => {
		if (err) throw err;

		if (
			req.body.email === result[0].email &&
			//sha256(req.body.password) === result[0].mdp
			req.body.password === result[0].mdp
		) {
			res.status(200).json({
				message: "Auth Ok.",
			});
		} else {
			res.status(403).json({
				message: "Auth Fail.",
			});
		}
	});
}

exports.auth = auth;
