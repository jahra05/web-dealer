const express = require("express");
const router = express.Router();

const simulasiController = require("../controllers/simulasiController");

router.get("/", simulasiController.getAllSimulasi);
router.get("/:id", simulasiController.getSimulasiById);
router.post("/", simulasiController.createSimulasi);
router.put("/:id", simulasiController.updateSimulasi);
router.delete("/:id", simulasiController.deleteSimulasi);

module.exports = router;