'use strict';

var Stage = require('../models/StageModel.js');

exports.list_all_stages = function (req, res) {

  Stage.getAllStage(function (err, stages) {

    if (err)
      res.send(err);
    res.send(stages);
  });
};

exports.list_stage_byeleveId = function (req, res) {
  Stage.getStageByEleveId(req.params.eleveId, function (err, stages) {
    if (err)
      res.send(err);
    res.send(stages);
  })
}

exports.list_stage_bytuteurId = function (req, res) {
  Stage.getStageByTuteurId(req.params.tuteurId, function (err, stages) {
    if (err)
      res.send(err);
    res.send(stages);
  })
}

exports.list_stage_byensId = function (req, res) {
  Stage.getStageByEnsId(req.params.ensId, function (err, stages) {
    if (err)
      res.send(err);
    res.send(stages);
  })
}

exports.current_stage = function (req, res) {
  Stage.getCurrentStageByEleveId(req.query.annee, req.query.eleveId, function (err, result) {
    if (err)
      res.send(err);
    res.status(200).send(result);
  })
}

exports.current_tuteur_stage = function (req, res) {
  Stage.getCurrentStageByTuteurId(req.query.annee, req.query.tuteurId, function (err, result) {
    if (err)
      res.send(err);
    res.status(200).send(result);
  })
}

exports.current_ens_stage = function (req, res) {
  Stage.getCurrentStageByEnsId(req.query.annee, req.query.ensId, function (err, result) {
    if (err)
      res.send(err);
    res.status(200).send(result);
  })
}


exports.list_stage_byId = function (req, res) {
  Stage.getStageById(req.params.idstage, function (err, stage) {
    if (err)
      res.send(err);
    res.send(stage);
  })
}


exports.list_stage_byIdForEval = function (req, res) {
  Stage.getStageByIdForEval(req.params.idstage, function (err, stage) {
    if (err)
      res.send(err);
    res.send(stage);
  })
}
