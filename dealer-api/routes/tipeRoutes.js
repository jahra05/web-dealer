const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken")
const tipeController = require("../controllers/tipeController")


router.get("/", tipeController.getAllTipe)
router.post("/", verifyToken, tipeController.createTipe)
router.put("/:id", verifyToken, tipeController.updateTipe)
router.delete("/:id", verifyToken, tipeController.deleteTipe)

module.exports = router