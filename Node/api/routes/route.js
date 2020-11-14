const express = require("express");
const authentificationControllers = require("../controllers/authentificationController");
const testControllers = require("../controllers/testController");

const router = express.Router();
router.get("/test", testControllers.testfunct);
router.post("/test", testControllers.testPost);

router.post("/auth", authentificationControllers.auth);
router.post("/tt", authentificationControllers.test);

module.exports = router;
