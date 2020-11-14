'use strict';

var Enseignant = require('../models/EnseignantModel.js');

exports.list_all_enseignants = function (req, res) {
  Enseignant.getAllEnseignant(function (err, enseignants) {

    if (err)
      res.send(err);
    res.send(enseignants);
  });
};
