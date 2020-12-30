const conn = require("../../mysqlConnect");
const config = require("../../config");
const fs = require("fs");

function getStage(req, res, next) {
	let query = `SELECT *
	from ${config.table.stage.tablename}`;
	conn.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}

function getStageById(req, res, next) {
	let query = `SELECT *
	from ${config.table.stage.tablename} WHERE ${config.table.stage.tablename}.${config.table.stage.idstage} = ${req.params.id}`;
	conn.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}

function createStage(req, res, next) {
	let query = `INSERT INTO ${config.table.stage.tablename} (${config.table.stage.ideleve}, ${config.table.stage.niveau}, ${config.table.stage.annee}, ${config.table.stage.idtuteur}, ${config.table.stage.idens}, ${config.table.stage.datedebut}, ${config.table.stage.datefin}, ${config.table.stage.titrestage}, ${config.table.stage.description}, ${config.table.stage.adressestage}, ${config.table.stage.adremailstage}, ${config.table.stage.cheminrapport}, ${config.table.stage.daterapport}, ${config.table.stage.cheminpres}, ${config.table.stage.datepres}, ${config.table.stage.chemineval}, ${config.table.stage.dateeval}, ${config.table.stage.evallancee}, ${config.table.stage.confidentiel}, ${config.table.stage.datelimiterendu}, ${config.table.stage.datelimiteeval}, ${config.table.stage.datesoutenance}, ${config.table.stage.datecomp}, ${config.table.stage.chemincomp})
    VALUES ("${req.body.ideleve}", "${req.body.niveau}", "${req.body.annee}", "${req.body.idtuteur}", "${req.body.idens}", "${req.body.datedebut}", "${req.body.datefin}", "${req.body.titrestage}", "${req.body.description}", "${req.body.adressestage}", "${req.body.adremailstage}", "${req.body.cheminrapport}", "${req.body.daterapport}", "${req.body.cheminpres}", "${req.body.datepres}", "${req.body.chemineval}", "${req.body.dateeval}", "${req.body.evallancee}", "${req.body.confidentiel}", "${req.body.datelimiterendu}", "${req.body.datelimiteeval}", "${req.body.datesoutenance}", "${req.body.datecomp}", "${req.body.chemincomp}")`;
	conn.query(query, (err, result) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				return res.status(406).json({
					message: "Address mail already used",
				});
			} else {
				throw err;
			}
		}
		res.status(200).json({ message: "Ok .", data: result });
	});
}

function deleteStage(req, res, next) {
	let query = `DELETE FROM stage WHERE stage.idstage = ${req.params.sid} `;
	conn.query(query, (err, result) => {
		if (err) throw err;

		res.status(200).json({ message: "Stage deleted", data: result });
	});
}

async function editStage(req, res, next) {
	if (
		req.body.titrestage &&
		req.body.description &&
		req.body.niveau &&
		req.body.annee &&
		req.body.datedebut &&
		req.body.datefin &&
		req.body.nomentreprise
	) {
		let q = `UPDATE ${config.table.stage.tablename} SET ${config.table.stage.titrestage} = "${req.body.titrestage}",  ${config.table.stage.description} = "${req.body.description}", ${config.table.stage.niveau} = "${req.body.niveau}", ${config.table.stage.annee} = "${req.body.annee}", ${config.table.stage.datedebut} = "${req.body.datedebut}", ${config.table.stage.datefin} = "${req.body.datefin}", ${config.table.stage.nomentreprise} = "${req.body.nomentreprise}"
    WHERE ${config.table.stage.idstage}= ${req.body.idstage}`;
		const result = await query(q);
		console.log(result);
		res.status(200).json({ message: "Ok ." });
	} else {
		res.status(400).json({ message: "Missing data" });
	}
}

async function getRapportStageById(req, res, next) {
	try {
		let q = `SELECT ${config.table.stage.cheminrapport} from ${config.table.stage.tablename} WHERE ${config.table.stage.idstage}=${req.params.id}`;

		let result = await query(q);
		var data = fs.readFileSync(result[0].cheminrapport);
		res.contentType("application/pdf");
		res.send(data);
	} catch (err) {
		console.log("une erreur", err);
	}
}

async function dlRapportStageById(req, res, next) {
	try {
		let q = `SELECT ${config.table.stage.cheminrapport} from ${config.table.stage.tablename} WHERE ${config.table.stage.idstage}=${req.params.id}`;
		let result = await query(q);
		console.log(result);
		var file = fs.createReadStream(result[0].cheminrapport);
		var stat = fs.statSync(result[0].cheminrapport);
		res.setHeader("Content-Length", stat.size);
		res.setHeader("Content-Type", "application/pdf");
		res.setHeader(
			"Content-Disposition",
			"attachment; filename=rapport.pdf"
		);
		file.pipe(res);
	} catch (err) {
		console.log("une erreur", err);
	}
}

exports.getStage = getStage;
exports.getStageById = getStageById;
exports.createStage = createStage;
exports.deleteStage = deleteStage;
exports.editStage = editStage;

exports.getRapportStageById = getRapportStageById;
exports.dlRapportStageById = dlRapportStageById;
