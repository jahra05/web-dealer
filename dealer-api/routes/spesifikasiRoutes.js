const express = require("express");
const router = express.Router();

const {
    getAllSpesifikasi,
    getSpesifikasi,
    createAllSpesifikasi,
    updateSpesifikasi,
    deleteSpesifikasi
} = require("../controllers/spesifikasiController")

router.get("/", getAllSpesifikasi);
router.get("/:id", getSpesifikasi);
router.post("/", createAllSpesifikasi);
router.put("/:id", updateSpesifikasi);
router.delete("/:id", deleteSpesifikasi)

module.exports = router