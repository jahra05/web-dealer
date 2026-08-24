const express = require("express")
const router = express.Router();

const kategoriController = require("../controllers/kategoriController");
const verifyToken = require("../middleware/verifyToken")

router.get("/", kategoriController.getAllKategori);
router.post("/", verifyToken, kategoriController.addKategori);
router.put("/:id_kategori", verifyToken, kategoriController.updateKategori);
router.put("/:id_kategori/status", (req, res, next) => {
    console.log("🔥 ROUTE STATUS KATEGORI DIPANGGIL");
    next();
}, verifyToken, kategoriController.updateStatusKategori);
// router.delete("/:id_kategori", verifyToken, kategoriController.deleteKategori);

module.exports = router