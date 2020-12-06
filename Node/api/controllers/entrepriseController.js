const db = require("../../mysqlConnect");
const config = require("../../config");

function getEntrepriseById(req, res, next) {
	let query = `SELECT *
	from ${config.table.entreprise.tablename}
	WHERE ${config.table.entreprise.id} = ${req.params.id}`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}

exports.getEntrepriseById = getEntrepriseById;
