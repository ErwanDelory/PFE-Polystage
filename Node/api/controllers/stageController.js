const conn = require('../../mysqlConnect');
const config = require('../../config');
const fs = require('fs');

function getStage(req, res, next) {
  let query = `SELECT ${config.table.stage.idstage}, ${config.table.stage.ideleve}, ${config.table.stage.niveau}, ${config.table.stage.annee}, ${config.table.stage.idtuteur}, ${config.table.stage.idens}, ${config.table.stage.datedebut}, ${config.table.stage.datefin}, ${config.table.stage.nomentreprise}, ${config.table.stage.titrestage}, ${config.table.stage.description}, ${config.table.stage.adressestage}, ${config.table.stage.adremailstage}, ${config.table.stage.cheminrapport}, ${config.table.stage.daterapport}, ${config.table.stage.cheminpres}, ${config.table.stage.datepres}, ${config.table.stage.chemineval}, ${config.table.stage.dateeval}, ${config.table.stage.evallancee}, ${config.table.stage.confidentiel}, ${config.table.stage.datelimiterendu}, ${config.table.stage.datelimiteeval}, ${config.table.stage.datesoutenance}, ${config.table.stage.datecomp}, ${config.table.stage.chemincomp}, ${config.table.utilisateur.nom}, ${config.table.utilisateur.prenom}
	from ${config.table.stage.tablename} LEFT JOIN ${config.table.utilisateur.tablename} ON ${config.table.stage.ideleve} = ${config.table.utilisateur.id}`;
  conn.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'Ok .', data: result });
  });
}

function getStageById(req, res, next) {
  let query = `SELECT *
	from ${config.table.stage.tablename} WHERE ${config.table.stage.tablename}.${config.table.stage.idstage} = ${req.params.id}`;
  conn.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'Ok .', data: result });
  });
}

function createStage(req, res, next) {
  let query = `INSERT INTO ${config.table.stage.tablename} (${config.table.stage.ideleve}, ${config.table.stage.niveau}, ${config.table.stage.annee}, ${config.table.stage.idtuteur}, ${config.table.stage.idens}, ${config.table.stage.datedebut}, ${config.table.stage.datefin}, ${config.table.stage.titrestage}, ${config.table.stage.description}, ${config.table.stage.nomentreprise}, ${config.table.stage.adressestage}, ${config.table.stage.adremailstage}, ${config.table.stage.cheminrapport}, ${config.table.stage.cheminpres}, ${config.table.stage.chemineval}, ${config.table.stage.confidentiel}, ${config.table.stage.chemincomp})
    VALUES ("${req.body.ideleve}", "${req.body.niveau}", "${req.body.annee}", "${req.body.idtuteur}", "${req.body.idens}", "${req.body.datedebut}", "${req.body.datefin}", "${req.body.titrestage}", "${req.body.description}", "${req.body.nomentreprise}", "${req.body.adressestage}", "${req.body.adremailstage}", "${req.body.cheminrapport}", "${req.body.cheminpres}", "${req.body.chemineval}", "${req.body.confidentiel}", "${req.body.chemincomp}")`;
  conn.query(query, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(406).json({
          message: 'Address mail already used',
        });
      } else {
        throw err;
      }
    }
    res.status(200).json({ message: 'Ok .', data: result });
  });
}

function deleteStage(req, res, next) {
  let query = `DELETE FROM stage WHERE stage.idstage = ${req.params.sid} `;
  conn.query(query, (err, result) => {
    if (err) throw err;

    res.status(200).json({ message: 'Stage deleted', data: result });
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
    conn.query(q, (err, result) => {
      console.log(result);
      res.status(200).json({ message: 'Ok .' });
    });
  } else {
    res.status(400).json({ message: 'Missing data' });
  }
}

async function startEval(req, res, next) {
  if (req.body.evallancee) {
    try {
      let q = `UPDATE stage SET evallancee = "${req.body.evallancee}", datelimiteeval = "${req.body.datelimiteeval}"
			WHERE idstage= ${req.body.idstage}`;
      conn.query(q, (err, result) => {
        console.log(result);
        res.status(200).json({ message: 'Ok .' });
      });
    } catch (err) {
      throw err;
    }
  } else {
    res.status(400).json({ message: 'Missing data' });
  }
}

async function getRapportStageById(req, res, next) {
  try {
    let q = `SELECT ${config.table.stage.cheminrapport} from ${config.table.stage.tablename} WHERE ${config.table.stage.idstage}=${req.params.id}`;

    conn.query(q, (err, result) => {
      var data = fs.readFileSync(result[0].cheminrapport);
      res.contentType('application/pdf');
      res.send(data);
    });
  } catch (err) {
    console.log('une erreur', err);
  }
}

async function dlRapportStageById(req, res, next) {
  try {
    let q = `SELECT ${config.table.stage.cheminrapport} from ${config.table.stage.tablename} WHERE ${config.table.stage.idstage}=${req.params.id}`;
    conn.query(q, (err, result) => {
      console.log(result);
      var file = fs.createReadStream(result[0].cheminrapport);
      var stat = fs.statSync(result[0].cheminrapport);
      res.setHeader('Content-Length', stat.size);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=rapport.pdf');
      file.pipe(res);
    });
  } catch (err) {
    console.log('une erreur', err);
  }
}

exports.getStage = getStage;
exports.getStageById = getStageById;
exports.createStage = createStage;
exports.deleteStage = deleteStage;
exports.editStage = editStage;
exports.startEval = startEval;

exports.getRapportStageById = getRapportStageById;
exports.dlRapportStageById = dlRapportStageById;
