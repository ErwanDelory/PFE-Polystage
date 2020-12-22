const db = require("../../mysqlConnect");
const config = require("../../config");

function getRetardEleve(req, res, next) {
	let query = `SELECT *
    from ${config.table.retardeleve.tablename}`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}
function newRetardEleve(req, res, next) {
	let query = `INSERT INTO ${config.table.retardeleve.tablename}(iduti, mailenvoye, rapport, presentation, autoeval)
    VALUES (${req.body.iduti},${req.body.mailenvoye},${req.body.rapport},${req.body.presentation},${req.body.autoeval})`;
	db.query(query, (err, result) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				return res.status(406).json({
					message: "Retard deja créé",
				});
			} else {
				throw err;
			}
		}
		res.status(200).json({ message: "Ok .", data: result });
	});
}

function deleteRetardEleve(req, res, next) {
	let query = `DELETE FROM retardeleve WHERE retardeleve.iduti = ${req.params.iduti}`;
	db.query(query, (err, result) => {
		if (err) throw err;

		res.status(200).json({ message: "Ok .", data: result });
	});
}

function updateRetardEleve(req, res, next) {
	let query = `UPDATE retardeleve SET mailenvoye = ${req.body.mailenvoye}, rapport = ${req.body.rapport}, presentation = ${req.body.presentation}, autoeval = ${req.body.autoeval}  WHERE retardeleve.iduti = ${req.params.iduti};`;
	db.query(query, (err, result) => {
		if (err) throw err;

		res.status(200).json({ message: "Ok .", data: result });
	});
}

function getRetardTuteur(req, res, next) {
	let query = `SELECT *
    from ${config.table.retardtuteur.tablename}`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}
function newRetardTuteur(req, res, next) {
	let query = `INSERT INTO retardtuteur (iduti, mailenvoye) 
    VALUES ("${req.body.iduti}","${req.body.mailenvoye}")`;
	db.query(query, (err, result) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				return res.status(406).json({
					message: "Retard deja créé",
				});
			} else {
				throw err;
			}
		}
		res.status(200).json({ message: "Ok .", data: result });
	});
}
function deleteRetardTuteur(req, res, next) {
	let query = `DELETE FROM retardtuteur WHERE retardtuteur.iduti = ${req.params.iduti}`;
	db.query(query, (err, result) => {
		if (err) throw err;

		res.status(200).json({ message: "Ok .", data: result });
	});
}

function updateRetardTuteur(req, res, next) {
	let query = `UPDATE retardtuteur SET mailenvoye = ${req.body.mailenvoye} 
    WHERE retardeleve.iduti = ${req.params.iduti};`;
	db.query(query, (err, result) => {
		if (err) throw err;

		res.status(200).json({ message: "Ok .", data: result });
	});
}

exports.getRetardEleve = getRetardEleve;
exports.newRetardEleve = newRetardEleve;
exports.deleteRetardEleve = deleteRetardEleve;
exports.updateRetardEleve = updateRetardEleve;

exports.getRetardTuteur = getRetardTuteur;
exports.newRetardTuteur = newRetardTuteur;
exports.deleteRetardTuteur = deleteRetardTuteur;
exports.updateRetardTuteur = updateRetardTuteur;
