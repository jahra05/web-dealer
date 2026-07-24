const express = require("express");
const router = express.Router();

const pengajuanController = require("../controllers/pengajuanController");

router.get("/", pengajuanController.getAllPengajuan);
router.get("/:id", pengajuanController.getPengajuanById);
router.post("/", pengajuanController.createPengajuan);
router.put("/:id", pengajuanController.updatePengajuan);
router.delete("/:id", pengajuanController.deletePengajuan);

module.exports = router;