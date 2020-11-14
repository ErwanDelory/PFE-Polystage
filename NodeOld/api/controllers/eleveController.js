'use strict';

var Eleve = require('../models/EleveModel.js');

exports.list_all_eleve = function (req, res) {
  Eleve.getAllEleve(function (err, eleves) {

    if (err)
      res.send(err);
    res.send(eleves);
  });
};

exports.get_eleve_infos = function (req, res) {
  Eleve.getEleveById(req.params.eleveId, function (err, eleve) {
    if (err)
      res.send(err);
    res.send(eleve);
  })
}
