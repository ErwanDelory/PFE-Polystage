const db = require('../../mysqlConnect');
const { query } = require('express');

async function testPost(req, res, next) {
  let query = `INSERT INTO eleves (ideleve, nom, prenom, email, numetudiant, mdp) VALUES ('', '${req.body.nom}', '${req.body.prenom}', '${req.body.email}', '${req.body.numetudiant}', '${req.body.mdp}')`;
  let values = [
    req.body.nom,
    req.body.prenom,
    req.body.email,
    req.body.numetudiant,
    req.body.mdp,
  ];
  console.log(values);
  db.query(query, [values], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: ' Add Ok .' });
  });
}

async function testfunct(req, res, next) {
  let query = 'SELECT * FROM eleves';
  db.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: ' Test Ok .', data: result });
  });
}

exports.testfunct = testfunct;
exports.testPost = testPost;
