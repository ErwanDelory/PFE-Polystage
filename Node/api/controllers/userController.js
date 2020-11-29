const db = require("../../mysqlConnect");
const config = require("../../config");

async function getEleves(req, res, next) {
	let query = `SELECT ${config.table.utilisateur.id},${config.table.utilisateur.nom},${config.table.utilisateur.prenom},${config.table.utilisateur.email},${config.table.infoetu.numetudiant},${config.table.infoetu.niveau},${config.table.infoetu.annee}
    from ${config.table.utilisateur.tablename} LEFT JOIN ${config.table.infoetu.tablename} ON ${config.table.utilisateur.id} = ${config.table.infoetu.id}
    WHERE ${config.table.utilisateur.role} = "Etudiant"`;

	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: " Add Ok .", data: result });
	});
}

async function getEnseignants(req, res, next) {
	let query = `SELECT ${config.table.utilisateur.id},${config.table.utilisateur.nom},${config.table.utilisateur.prenom},${config.table.utilisateur.email} from ${config.table.utilisateur.tablename} WHERE ${config.table.utilisateur.role} = "Enseignant"`;

	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: " Add Ok .", data: result });
	});
}

async function getTuteurs(req, res, next) {
	let query = `SELECT ${config.table.utilisateur.id},${config.table.utilisateur.nom},${config.table.utilisateur.prenom},${config.table.utilisateur.email} from ${config.table.utilisateur.tablename} WHERE ${config.table.utilisateur.role} = "Tuteur"`;

	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: " Add Ok .", data: result });
	});
}

exports.getEleves = getEleves;
exports.getEnseignants = getEnseignants;
exports.getTuteurs = getTuteurs;
