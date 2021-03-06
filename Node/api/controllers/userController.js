const db = require("../../mysqlConnect");
const config = require("../../config");

function getEleves(req, res, next) {
	let query = `SELECT ${config.table.utilisateur.id},${config.table.utilisateur.nom},${config.table.utilisateur.prenom},${config.table.utilisateur.email},${config.table.infoetu.numetudiant},${config.table.infoetu.niveau},${config.table.infoetu.annee}
    from ${config.table.utilisateur.tablename} LEFT JOIN ${config.table.infoetu.tablename} ON ${config.table.utilisateur.id} = ${config.table.infoetu.id}
    WHERE ${config.table.utilisateur.role} = "Etudiant"`;

	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}
function getEleveById(req, res, next) {
	let query = `SELECT ${config.table.utilisateur.id},${config.table.utilisateur.nom},${config.table.utilisateur.prenom},${config.table.utilisateur.email},${config.table.infoetu.numetudiant},${config.table.infoetu.niveau},${config.table.infoetu.annee}
    from ${config.table.utilisateur.tablename} LEFT JOIN ${config.table.infoetu.tablename} ON ${config.table.utilisateur.id} = ${config.table.infoetu.id}
    WHERE ${config.table.utilisateur.id}=${req.params.id} AND ${config.table.utilisateur.role} = "Etudiant"`;

	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}

function getEnseignants(req, res, next) {
	let query = `SELECT ${config.table.utilisateur.id},${config.table.utilisateur.nom},${config.table.utilisateur.prenom},${config.table.utilisateur.email} from ${config.table.utilisateur.tablename} WHERE ${config.table.utilisateur.role} = "Enseignant"`;

	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}

function getTuteurs(req, res, next) {
	let query = `SELECT ${config.table.utilisateur.id},${config.table.utilisateur.nom},${config.table.utilisateur.prenom},${config.table.utilisateur.email} from ${config.table.utilisateur.tablename} WHERE ${config.table.utilisateur.role} = "Tuteur"`;

	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}
function getUsers(req, res, next) {
	let query = `SELECT ${config.table.utilisateur.id},${config.table.utilisateur.nom},${config.table.utilisateur.prenom},${config.table.utilisateur.email}
    from ${config.table.utilisateur.tablename}`;

	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}
function getUserById(req, res, next) {
	let query = `SELECT ${config.table.utilisateur.id},${config.table.utilisateur.nom},${config.table.utilisateur.prenom},${config.table.utilisateur.email}
    from ${config.table.utilisateur.tablename}
    WHERE ${config.table.utilisateur.id}=${req.params.id}`;

	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}

function deleteUser(req, res) {
	let query = `DELETE FROM utilisateur WHERE utilisateur.id = ${req.params.id}`;

	db.query(query, (err, result) => {
		if (err) throw err;

		return res.status(200).json({
			message: "User Deleted.",
		});
	});
}

function whoAmI(req) {
	if (!req.user) return false;
	return req.user.id;
}

exports.whoAmI = whoAmI;

exports.getEleves = getEleves;
exports.getEleveById = getEleveById;

exports.getEnseignants = getEnseignants;
exports.getTuteurs = getTuteurs;

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.deleteUser = deleteUser;
