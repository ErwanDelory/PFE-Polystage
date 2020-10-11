'use strict';

var Question = require('../models/QuestionModel.js');
var Competence = require('../models/CompetenceModel.js');

exports.getQuestionsByCat = function (req, res) {
  Question.list_QuestionsByCat(req.params.id, function (err, questions) {
    if (err)
      res.status(500).send(err);
    if (questions && questions.length) {
      let queryTitle = "SELECT name FROM categorie WHERE idcat = ?";
      db.query(queryTitle, [req.params.id], (err, title) => {
        if (err) {
          res.status(500).send(err);
        }
        if (title && title.length) {
          res.status(200).send({
            questions: questions,
            title: title[0].name
          });
        } else {
          res.status(401).send("Pas de titre dans cette catégorie");
        }
      })
    } else {
      res.status(401).send("No questions were found");
    }
  })
}

exports.list_AllCompetences = function (req, res) {
  Competence.getAllCompetences(function (err, competences) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    res.status(200).send(competences)
  })
}

exports.list_AllChoixByIdcomp = function (req, res) {
  Competence.getAllNiveauxByIdComp(req.params.idcompetence, function (err, competences) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    res.status(200).send(competences)
  })
}