const express = require("express");
const authentificationControllers = require("../controllers/authentificationController");
const registerController = require("../controllers/registerController");
const userControllers = require("../controllers/userController");
const stageControllers = require("../controllers/stageController");
const questionControllers = require("../controllers/questionController");
const retardControllers = require("../controllers/retardController");

const fileUpload = require("../controllers/file-upload");

const router = express.Router();

//Authentification Controller
router.post("/auth", authentificationControllers.auth);
router.post("/register", registerController.register);

//User Controller
router.get("/eleves", userControllers.getEleves);
router.get("/eleve/:id", userControllers.getEleveById);

router.get("/enseignants", userControllers.getEnseignants);
router.get("/tuteurs", userControllers.getTuteurs);

router.get("/users", userControllers.getUsers);
router.get("/user/:id", userControllers.getUserById);
router.delete("/user/:id", userControllers.deleteUser);

//Stage Controller
router.post("/newstage", stageControllers.createStage);
router.put("/editstage", stageControllers.editStage);
router.delete("/stage/:sid", stageControllers.deleteStage);
router.get("/stages", stageControllers.getStage);
router.get("/stage/:id", stageControllers.getStageById);
router.get("/rapport/:id", stageControllers.getRapportStageById);
router.get("/dlrapport/:id", stageControllers.dlRapportStageById);

//Question / Competence Controller
router.get("/questions", questionControllers.getQuestions);
router.get("/competences", questionControllers.getCompetences);

//Retard Controller

router.get("/retardeleve", retardControllers.getRetardEleve);
router.get("/retardtuteur", retardControllers.getRetardTuteur);

router.post("/retardeleve", retardControllers.newRetardEleve);
router.post("/retardtuteur", retardControllers.newRetardTuteur);

router.delete("/retardeleve/:iduti", retardControllers.deleteRetardEleve);
router.delete("/retardtuteur/:iduti", retardControllers.deleteRetardTuteur);

router.patch("/retardeleve/:iduti", retardControllers.updateRetardEleve);
router.patch("/retardtuteur/:iduti", retardControllers.updateRetardTuteur);

//Upload
router.post(
	"/upload/:nom/:prenom/:annee/:niveau/:type",
	fileUpload.single("file"),
	(req, res) => {
		res.send({ msg: "Uploaded" });
	}
);

router.get("/who", userControllers.whoAmI)

module.exports = router;
