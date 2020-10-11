'use strict';
module.exports = function (app) {
  var EntrepriseControlleur = require('../controllers/entrepriseController');
  var EnseignantControlleur = require('../controllers/enseignantController');
  var EleveControlleur = require('../controllers/eleveController');
  var TuteurControlleur = require('../controllers/tuteurController');
  var StageControlleur = require('../controllers/stageController');
  var Authentification = require('../controllers/authentificationController');
  var FileControlleur = require('../controllers/fileController');
  var QuestionControlleur = require('../controllers/questionController');
  var FormControlleur = require('../controllers/formController');
  var MailControlleur = require('../controllers/mailController')

  app.route('/entreprises')
    .get(EntrepriseControlleur.list_all_entreprises)
    .post(EntrepriseControlleur.create_entreprise);

  app.route('/enseignants')
    .get(EnseignantControlleur.list_all_enseignants);

  app.route('/eleves')
    .get(EleveControlleur.list_all_eleve);

  app.route('/eleves/retard')
    .get(MailControlleur.list_all_retard_eleve);

  app.route('/eleves/:eleveId')
    .get(EleveControlleur.get_eleve_infos);

  app.route('/tuteurs')
    .get(TuteurControlleur.list_all_tuteurs);

  app.route('/tuteurs/retard')
    .get(MailControlleur.list_all_retard_tuteur);

  app.route('/stages')
    .get(StageControlleur.list_all_stages);

  app.route('/stages/update')
    .get(MailControlleur.verif_dates_stage);

  app.route('/stages/:idstage')
    .get(StageControlleur.list_stage_byId)
    .put(FormControlleur.update_stage_byId);

  app.route('/stages/eval/:idstage')
    .get(StageControlleur.list_stage_byIdForEval)
    .post(FormControlleur.FormEval);

  app.route('/stages/evalcompetences/:idstage')
    .post(FormControlleur.FormComp);

  app.route('/current/eleve/stage')
    .get(StageControlleur.current_stage);

  app.route('/current/tuteur/stage')
    .get(StageControlleur.current_tuteur_stage);

  app.route('/current/ens/stage')
    .get(StageControlleur.current_ens_stage);

  app.route('/stages/eleves/:eleveId')
    .get(StageControlleur.list_stage_byeleveId);

  app.route('/stages/tuteurs/:tuteurId')
    .get(StageControlleur.list_stage_bytuteurId);

  app.route('/stages/ens/:ensId')
    .get(StageControlleur.list_stage_byensId);

  app.route('/authentification')
    .get(Authentification.authentification);

  app.route('/upload')
    .post(FileControlleur.uploadFile);

  app.route('/questionsByCat/:id')
    .get(QuestionControlleur.getQuestionsByCat);

  app.route('/competences')
    .get(QuestionControlleur.list_AllCompetences);

  app.route('/competences/:idcompetence')
    .get(QuestionControlleur.list_AllChoixByIdcomp);

  app.route('/forms/eleve')
    .post(FormControlleur.FormEleve);

  app.route('/mail/evaluation')
    .post(MailControlleur.proced_eval)

  app.route('/mail/rappel')
    .post(MailControlleur.send_rappels)

};
