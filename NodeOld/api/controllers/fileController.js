var multer = require('multer');
const fs = require('fs');
var Mail = require('../models/MailModel.js');
var Stage = require('../models/StageModel.js');

function send_confirmation(type, mail) {
  var sujet = "Confirmation de l'envoi de votre " + type + ""
  var corps = "Bonjour,</br></br>Nous vous confirmons que votre " + type + " a bien été téléchargé sur notre serveur.</br>"
    + 'Vous pouvez dès maintenant le visualiser sur votre <a href="http://localhost:8080/#!/home" target="_blank">espace personnel</a>.</br></br>'
    + "Nous vous souhaitons une agréable journée,</br>"
    + "L'équipe BILO</br>"
    + '<img src="https://polytech.univ-amu.fr/sites/polytech.univ-amu.fr/files/logo.png" alt="Logo Polytech Marseille"/>';

  Mail.send_mail(mail, sujet, corps)
}
exports.uploadFile = function (req, res) {

  var anneedir = './public/' + req.query.annee + '/';
  var dir = './public/' + req.query.annee + '/' + req.query.niveau + 'A/';

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(anneedir)) {
        fs.mkdirSync(anneedir);
      }
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, dir)
    },
    filename: function (req, file, cb) {
      cb(null, req.query.annee + '_' + req.query.niveau + 'A_' + req.query.nom + '_' + req.query.prenom + '_' + req.query.type + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
  });
  var upload = multer({
    storage: storage
  }).single('file');

  upload(req, res, function (err) {
    if (err) {
      res.send(err);

    }
    var newStage = {}

    var currentDate = Mail.getcurrentDate();
    if (req.query.type == "rapport") {
      newStage.daterapport = currentDate;
      newStage.cheminrapport = './' + req.file.path;
    } else {
      newStage.datepres = currentDate;
      newStage.cheminpres = './' + req.file.path;
    }
    send_confirmation(req.query.type, req.query.mail);
    Stage.updateStage(req.query.idstage, newStage, function (err, stage) {
      if (err)
        res.send(err);
      res.status(stage).send()
    })
    res.status(200).send();
  })
}
