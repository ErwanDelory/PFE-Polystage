const express = require("express");
const authentificationControllers = require("../controllers/authentificationController");
const registerController = require("../controllers/registerController");
const userControllers = require("../controllers/userController");

const router = express.Router();
router.post("/auth", authentificationControllers.auth);
router.post("/register", registerController.register);

router.get("/eleves", userControllers.getEleves);
router.get("/enseignants", userControllers.getEnseignants);
router.get("/tuteurs", userControllers.getTuteurs);

module.exports = router;
