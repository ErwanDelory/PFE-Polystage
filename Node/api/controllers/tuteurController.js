'use strict';

var Tuteur = require('../models/TuteurModel.js');

exports.list_all_tuteurs = function (req, res) {
  Tuteur.getAllTuteur(function (err, tuteurs) {

    if (err)
      res.send(err);
    res.send(tuteurs);
  });
};
