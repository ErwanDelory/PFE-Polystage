const express = require("express");
const authentificationControllers = require("../controllers/authentificationController");
const registerController = require("../controllers/registerController");
const userControllers = require("../controllers/userController");

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

router.get("/stages", userControllers.getStage);
router.get("/stage/:id", userControllers.getStageById);

module.exports = router;
