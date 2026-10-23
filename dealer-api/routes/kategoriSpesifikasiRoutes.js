const express = require("express")
const router = express.Router()

const { getAllKategoriSpesifikasi, addKategoriSpesifikasi, updateKategoriSpesifikasi } = require('../controllers/kategoriSpesifikasiController')

router.get("/", getAllKategoriSpesifikasi)
router.post("/", addKategoriSpesifikasi)
router.put("/:id", updateKategoriSpesifikasi)

module.exports = router