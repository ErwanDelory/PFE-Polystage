const config = require("./config");
const db = require("./mysqlConnect");

function getCours(userId) {
	let query = "SELECT * FROM eleves";

	const data = [];

	return new Promise((resolve, reject) => {
		db.query(query, data, (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		});
	});
}
module.exports.getCours = getCours;
