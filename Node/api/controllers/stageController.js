const db = require("../../mysqlConnect");
const config = require("../../config");

function getStage(req, res, next) {
	let query = `SELECT *
	from ${config.table.stage.tablename}`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}

function getStageById(req, res, next) {
	let query = `SELECT *
	from ${config.table.stage.tablename}
	WHERE ${config.table.stage.idstage} = ${req.params.id}`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}

function createStage(req, res, next) {
	let query = `INSERT INTO ${config.table.stage.tablename} (${config.table.stage.ideleve}, ${config.table.stage.niveau}, ${config.table.stage.annee}, ${config.table.stage.idtuteur}, ${config.table.stage.idens}, ${config.table.stage.datedebut}, ${config.table.stage.datefin}, ${config.table.stage.identreprise}, ${config.table.stage.titrestage}, ${config.table.stage.description}, ${config.table.stage.adressestage}, ${config.table.stage.adremailstage}, ${config.table.stage.cheminrapport}, ${config.table.stage.daterapport}, ${config.table.stage.cheminpres}, ${config.table.stage.datepres}, ${config.table.stage.chemineval}, ${config.table.stage.dateeval}, ${config.table.stage.evallancee}, ${config.table.stage.confidentiel}, ${config.table.stage.datelimiterendu}, ${config.table.stage.datelimiteeval}, ${config.table.stage.datesoutenance}, ${config.table.stage.datecomp}, ${config.table.stage.chemincomp}) 
    VALUES ("${req.body.ideleve}", "${req.body.niveau}", "${req.body.annee}", "${req.body.idtuteur}", "${req.body.idens}", "${req.body.datedebut}", "${req.body.datefin}", "${req.body.identreprise}", "${req.body.titrestage}", "${req.body.description}", "${req.body.adressestage}", "${req.body.adremailstage}", "${req.body.cheminrapport}", "${req.body.daterapport}", "${req.body.cheminpres}", "${req.body.datepres}", "${req.body.chemineval}", "${req.body.dateeval}", "${req.body.evallancee}", "${req.body.confidentiel}", "${req.body.datelimiterendu}", "${req.body.datelimiteeval}", "${req.body.datesoutenance}", "${req.body.datecomp}", "${req.body.chemincomp}")`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(200).json({ message: "Ok .", data: result });
	});
}

exports.getStage = getStage;
exports.getStageById = getStageById;
exports.createStage = createStage;
