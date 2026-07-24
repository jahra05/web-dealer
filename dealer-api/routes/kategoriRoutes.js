const express = require("express")
const router = express.Router();

const kategoriController = require("../controllers/kategoriController");
const verifyToken = require("../middleware/verifyToken")

router.get("/", kategoriController.getAllKategori);
router.post("/", verifyToken, kategoriController.addKategori);
router.put("/:id_kategori", verifyToken, kategoriController.updateKategori);
router.delete("/:id_kategori", verifyToken, kategoriController.deleteKategori);

module.exports = router