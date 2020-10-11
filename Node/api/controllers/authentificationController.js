'use strict';

var Eleve = require('../models/EleveModel.js');
var Enseignant = require('../models/EnseignantModel.js')
var Tuteur = require('../models/TuteurModel.js');

exports.authentification = function (req, res) {
  Eleve.getEleveAuth(req.query.username, req.query.password, function (err, result) {
    if (err)
      res.status(500).send(err);
    if (result && result.length) {
      Eleve.getEleveById(result[0].ideleve, function (err, eleve) {
        eleve[0].role = "eleve";
        res.status(200).send(eleve);
      })
    } else {
      Enseignant.getEnsAuth(req.query.username, req.query.password, function (err, resEns) {
        if (err)
          res.status(500).send(err);
        if (resEns && resEns.length) {
          resEns[0].role = "enseignant";
          res.status(200).send(resEns);
        } else {
          Tuteur.getTuteurAuth(req.query.username, req.query.password, function (err, resTuteur) {
            if (err)
              res.status(500).send(err);
            if (resTuteur && resTuteur.length) {
              resTuteur[0].role = "tuteur";
              res.status(200).send(resTuteur);
            } else {
              res.status(401).send("Authentification Failed");
            }
          })
        }
      })
    };
  });
}