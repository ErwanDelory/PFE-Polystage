const express = require('express');
const authentificationControllers = require('../controllers/authentificationController');
const registerController = require('../controllers/registerController');
const userControllers = require('../controllers/userController');
const stageControllers = require('../controllers/stageController');
const questionControllers = require('../controllers/questionController');
const retardControllers = require('../controllers/retardController');
const EvalControllers = require('../controllers/evalController');

const fileUpload = require('../controllers/file-upload');
const { sendEmail } = require('../controllers/mailController');

const router = express.Router();

//Authentification Controller
router.post('/auth', authentificationControllers.auth);
router.post('/register', registerController.register);

//User Controller
router.get('/eleves', userControllers.getEleves);
router.get('/eleve/:id', userControllers.getEleveById);

router.get('/enseignants', userControllers.getEnseignants);
router.get('/tuteurs', userControllers.getTuteurs);

router.get('/users', userControllers.getUsers);
router.get('/user/:id', userControllers.getUserById);
router.delete('/user/:id', userControllers.deleteUser);

//Stage Controller / upload
router.post('/newstage', stageControllers.createStage);
router.put('/editstage', stageControllers.editStage);
router.delete('/stage/:sid', stageControllers.deleteStage);
router.get('/stages', stageControllers.getStage);
router.get('/stage/:id', stageControllers.getStageById);
router.get('/rapport/:id', stageControllers.getRapportStageById);
router.get('/presentation/:id', stageControllers.getPresentationStageById);
router.get('/eval/rapport/:id', stageControllers.getEvalStageById);
router.get('/comp/rapport/:id', stageControllers.getCompStageById);
router.get('/dlrapport/:id', stageControllers.dlRapportStageById);

router.post(
	'/upload/:nom/:prenom/:annee/:niveau/:type',
	fileUpload.single('file'),
	(req, res) => {
		res.send({ msg: 'Uploaded' });
	}
);

//Eval
router.put('/starteval', EvalControllers.startEval);
router.post('/eval/:type', EvalControllers.GenererPdf);

//Question / Competence Controller
router.get('/questions', questionControllers.getQuestions);
router.get('/competences', questionControllers.getCompetences);

//Retard Controller

router.get('/retardeleve', retardControllers.getRetardEleve);
router.get('/retardtuteur', retardControllers.getRetardTuteur);

router.post('/retardeleve', retardControllers.newRetardEleve);
router.post('/retardtuteur', retardControllers.newRetardTuteur);

router.delete('/retardeleve/:iduti', retardControllers.deleteRetardEleve);
router.delete('/retardtuteur/:iduti', retardControllers.deleteRetardTuteur);

router.patch('/retardeleve/:iduti', retardControllers.updateRetardEleve);
router.patch(
	'/retardeleve/rapport/:iduti',
	retardControllers.updateRetardRapportEleve
);
router.patch(
	'/retardeleve/presentation/:iduti',
	retardControllers.updateRetardPresentationEleve
);
router.patch('/retardtuteur/:iduti', retardControllers.updateRetardTuteur);

// Mail
router.post('/sendMail/eleve', (req, res) => {
	sendEmail('pfepolystage@gmail.com', req.body.name, 'eleve');
	res.status(200).json({ message: 'Mail envoyé' });
});

router.post('/sendMail/tuteur', (req, res) => {
	sendEmail('pfepolystage@gmail.com', req.body.name, 'tuteur');
	res.status(200).json({ message: 'Mail envoyé' });
});

module.exports = router;
