const express = require('express');
const router = express.Router();

const heroController = require("../controllers/heroController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", heroController.geHero)
router.post("/", verifyToken, heroController.createHero)
router.delete("/:id", verifyToken, heroController.deleteHero)

module.exports = router