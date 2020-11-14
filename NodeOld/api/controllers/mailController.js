'use strict';
var moment = require('moment')
var Stage = require('../models/StageModel.js');
var Tuteur = require('../models/TuteurModel.js');
var Eleve = require('../models/EleveModel.js')
var Retard = require('../models/RetardModel.js');
var Mail = require('../models/MailModel.js')
var date_actuel = new Date().toISOString();
var sha512 = require('js-sha512')
var generator = require('generate-password');

function verif_date(date_rendu, date_limite, type_retard) {
  var retardRendu = moment(date_rendu).isAfter(date_limite);
  var nonRendu = moment(date_actuel).isAfter(date_limite);
  return (retardRendu || nonRendu)
}

function generate_randompw() {
  var password = generator.generate({
    length: 8,
    numbers: true,
    symbols: true,
    uppercase: true
  });
  return password;
}

function send_mail_tuteur(tuteur) {
  var destinataire = tuteur.emailtuteur;
  var sujet = "Retard sur l'evaluation de stage"
  var corps = "Bonjour,</br></br>Vous etes actuellement en retard sur l'evaluation de notre eleve</br></br>"
    + 'Vous pouvez le remplir sur votre <a href="http://localhost:8080/#!/home" target="_blank">espace personnel</a> : </br></br></br></br>'
    + "Nous vous souhaitons une agréable journée,</br>"
    + "L'équipe BILO</br>"
    + '<img src="https://polytech.univ-amu.fr/sites/polytech.univ-amu.fr/files/logo.png" alt="Logo Polytech Marseille"/>';
  Mail.send_mail(destinataire, sujet, corps)
}

function send_mail_eleve(eleve) {
  var destinataire = eleve.email;
  var sujet = "Retard sur la gestion numérique de votre stage"
  var corps = "Bonjour,</br></br>Vous etes actuellement en retard sur :</br>"
  if (eleve.rapport == 1) corps += "-Rapport à télécharger</br> "
  if (eleve.presentation == 1) corps += "-Support de présentation à télécharger</br> "
  corps += 'Vous pouvez y remedier sur votre <a href="http://localhost:8080/#!/home" target="_blank">espace personnel</a> : </br></br></br></br>'
    + "Nous vous souhaitons une agréable journée,</br>"
    + "L'équipe BILO</br>"
    + '<img src="https://polytech.univ-amu.fr/sites/polytech.univ-amu.fr/files/logo.png" alt="Logo Polytech Marseille"/>';
  Mail.send_mail(destinataire, sujet, corps)
}



//envoie mail à l'admin et eleve en cas de retard
//verif daterapp < datelimiterend
//verif dateeval < datelimiteval
//verif datepres < datesoutenance
exports.verif_dates_stage = function (req, res) {
  Stage.getAllStage(function (err, stages) {
    if (err)
      res.send(err);
    for (var stage of stages) {
      var annee_actuel = moment(date_actuel).format("YYYY")
      var annee_limite = moment(stage.datelimiterendu).format("YYYY")
      if (annee_actuel == annee_limite) {
        var newRetard = new Retard(stage.ideleve, stage.ideleve)
        if (verif_date(stage.daterapp, stage.datelimiterendu)) newRetard["rapport"] = 1;
        if (verif_date(stage.datepres, stage.datesoutenance)) newRetard["presentation"] = 1;
        if (verif_date(stage.dateeval, stage.datelimiteeval)) newRetard["evaluation"] = 1;
        if (newRetard.rapport || newRetard.presentation || newRetard.evaluation) Retard.updateRetardEleve(newRetard);
      }
    }
    res.send(stages);
  });
};


exports.proced_eval = function (req, res) {
  var pw = generate_randompw();
  var pwhash = sha512(pw);
  Tuteur.getTuteurById(req.query.idtuteur, function (err, tuteurtrouve) {
    if (err) {
      res.status(500).send(err);
    } else {
      var newStage = {}
      newStage.evallancee = moment(req.query.datetime, "DD/MM/YYYY à HH:mm:ss").format("YYYY/MM/DD HH:mm:ss");
      Stage.updateStage(req.query.idstage, newStage, function (req, res) { })
      var mailtuteur = tuteurtrouve[0].emailtuteur;
      Tuteur.updateTuteurAccById(mailtuteur, pwhash, function (err, res) { });
      var prenomeleve = req.query.prenom;
      var nomeleve = req.query.nom;
      var sujet = "Evaluation de stage de l'élève " + prenomeleve + " " + nomeleve + " disponible"
      var corps = "Bonjour,</br></br>Merci de bien vouloir compléter l'évaluation du stage de " + prenomeleve + " " + nomeleve + ".</br>"
        + 'Voici vos informations pour accéder à votre <a href="http://localhost:8080/#!/home" target="_blank">espace personnel</a> : </br></br>'
        + 'Identifiant : ' + mailtuteur + '</br>'
        + 'Mot de passe : ' + pw + '</br></br>'
        + "Nous vous souhaitons une agréable journée,</br>"
        + "L'équipe BILO</br>"
        + '<img src="https://polytech.univ-amu.fr/sites/polytech.univ-amu.fr/files/logo.png" alt="Logo Polytech Marseille"/>';

      Mail.send_mail(mailtuteur, sujet, corps)
      res.status(200).send();
    }
  })

};

exports.send_rappels = function (req, res) {
  var retardsEleves = req.query.retardsEleves
  var retardsTuteurs = req.query.retardsTuteurs
  if (Array.isArray(retardsEleves)) {
    for (var eleve of retardsEleves) {
      send_mail_eleve(JSON.parse(eleve))
    }
  } else {
    send_mail_eleve(JSON.parse(retardsEleves))
  }
  Retard.UpdateMailEleve();
  if (Array.isArray(retardsTuteurs)) {
    for (var tuteur of retardsTuteurs) {
      send_mail_tuteur(JSON.parse(tuteur))
    }
  } else {
    send_mail_tuteur(JSON.parse(retardsTuteurs))
  }
  Retard.UpdateMailTuteur();
  res.status(200).send();
};

exports.list_all_retard_eleve = function (req, res) {
  Retard.getAllRetard("eleve", function (err, eleves) {

    if (err)
      res.send(err);
    res.send(eleves);
  });
};

exports.list_all_retard_eleve = function (req, res) {
  Retard.getAllRetard("eleve", function (err, eleves) {

    if (err)
      res.send(err);
    res.send(eleves);
  });
}

exports.list_all_retard_tuteur = function (req, res) {
  Retard.getAllRetard("tuteur", function (err, tuteurs) {
    if (err)
      res.send(err);
    res.send(tuteurs);
  });
}
