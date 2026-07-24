const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const varianController = require("../controllers/varianController");


router.get("/", varianController.getAllVarian);
router.post("/", verifyToken, varianController.createVarian);
router.put("/:id", verifyToken, varianController.updateVarian);
router.delete("/:id", verifyToken, varianController.deleteVarian);

module.exports = router;