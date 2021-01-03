const db = require('../../mysqlConnect');
const config = require('../../config');

//question et catégorie/souscat

function getQuestions(req, res, next) {
  let query = `SELECT idquest, question, type, is4a,is5a,choix,niveau, categorie.name AS catname, souscategorie.name AS souscatname
    from questions
    LEFT JOIN categorie ON questions.cat = categorie.idcat
    LEFT JOIN souscategorie ON questions.souscat = souscategorie.idsouscat`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'Ok .', data: result });
  });
}
/*
function newQuestion(req, res, next) {
	let query = `INSERT INTO questions (idquest, question, cat, souscat, type, is4a, is5a, choix, niveau) 
    VALUES (NULL, ${req.body.question}, ${req.body.cat}, ${req.body.souscat}, ${req.body.type}, ${req.body.is4a}, ${req.body.is5a}, ${req.body.choix}, ${req.body.niveau});`;
	db.query(query, (err, result) => {
		if (err) throw err;

		res.status(200).json({ message: "Ok .", data: result });
	});
}*/

function getCompetences(req, res, next) {
  let query = `SELECT * from competences LEFT JOIN niveauxcompetences ON competences.idcompetence = niveauxcompetences.idcompetence`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'Ok .', data: result });
  });
}
exports.getQuestions = getQuestions;
exports.getCompetences = getCompetences;
