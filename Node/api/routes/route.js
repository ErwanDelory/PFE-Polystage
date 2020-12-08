const express = require("express");
const authentificationControllers = require("../controllers/authentificationController");
const registerController = require("../controllers/registerController");
const userControllers = require("../controllers/userController");
const stageControllers = require("../controllers/stageController");
const entrepriseControllers = require("../controllers/entrepriseController");
const test = require("../controllers/test");

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

//Stage Controller
router.post("/newstage", stageControllers.createStage);
router.get("/stages", stageControllers.getStage);
router.get("/stage/:id", stageControllers.getStageById);
router.get("/rapport/:id", stageControllers.getRapportStageById);
router.get("/dlrapport/:id", stageControllers.dlRapportStageById);

//Entreprise Controller
router.get("/entreprise/:id", entrepriseControllers.getEntrepriseById);

//Test
router.get("/test", test.example2);

module.exports = router;
