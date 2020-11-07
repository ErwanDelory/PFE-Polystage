const express = require("express");
//const { check } = require("express-validator");

const EntrepriseControlleur = require('../controllers/entrepriseController');
const EnseignantControlleur = require('../controllers/enseignantController');
const EleveControlleur = require('../controllers/eleveController');
const TuteurControlleur = require('../controllers/tuteurController');
const StageControlleur = require('../controllers/stageController');
const Authentification = require('../controllers/authentificationController');
const FileControlleur = require('../controllers/fileController');
const QuestionControlleur = require('../controllers/questionController');
const FormControlleur = require('../controllers/formController');
const MailControlleur = require('../controllers/mailController')

const app = express();

const router = express.Router();

router.get("/pid",EnseignantControlleur.list_all_enseignants);

router.get("/uid", EleveControlleur.list_all_eleve);

/*
router.route('/entreprises')
.get(EntrepriseControlleur.list_all_entreprises)
.post(EntrepriseControlleur.create_entreprise);

router.route('/enseignants')
.get(EnseignantControlleur.list_all_enseignants);

router.route('/eleves')
.get(EleveControlleur.list_all_eleve);

router.route('/eleves/retard')
.get(MailControlleur.list_all_retard_eleve);

router.route('/eleves/:eleveId')
.get(EleveControlleur.get_eleve_infos);

router.route('/tuteurs')
.get(TuteurControlleur.list_all_tuteurs);

router.route('/tuteurs/retard')
.get(MailControlleur.list_all_retard_tuteur);

router.route('/stages')
.get(StageControlleur.list_all_stages);

router.route('/stages/update')
.get(MailControlleur.verif_dates_stage);

router.route('/stages/:idstage')
.get(StageControlleur.list_stage_byId)
.put(FormControlleur.update_stage_byId);

router.route('/stages/eval/:idstage')
.get(StageControlleur.list_stage_byIdForEval)
.post(FormControlleur.FormEval);

router.route('/stages/evalcompetences/:idstage')
.post(FormControlleur.FormComp);

router.route('/current/eleve/stage')
.get(StageControlleur.current_stage);

router.route('/current/tuteur/stage')
.get(StageControlleur.current_tuteur_stage);

router.route('/current/ens/stage')
.get(StageControlleur.current_ens_stage);

router.route('/stages/eleves/:eleveId')
.get(StageControlleur.list_stage_byeleveId);

router.route('/stages/tuteurs/:tuteurId')
.get(StageControlleur.list_stage_bytuteurId);

router.route('/stages/ens/:ensId')
.get(StageControlleur.list_stage_byensId);

router.route('/authentification')
.post(Authentification.authentification);

router.route('/upload')
.post(FileControlleur.uploadFile);

router.route('/questionsByCat/:id')
.get(QuestionControlleur.getQuestionsByCat);

router.route('/competences')
.get(QuestionControlleur.list_AllCompetences);

router.route('/competences/:idcompetence')
.get(QuestionControlleur.list_AllChoixByIdcomp);

router.route('/forms/eleve')
.post(FormControlleur.FormEleve);

router.route('/mail/evaluation')
.post(MailControlleur.proced_eval)

router.route('/mail/rappel')
.post(MailControlleur.send_rappels)
*/
module.exports = router;
