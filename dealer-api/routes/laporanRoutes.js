const express = require("express");
const router = express.Router();

const { produk,
    pengajuanKredit,
    contact, testomoni } = require("../controllers/laporanController");

router.get("/produk", produk)
router.get("/pengajuanKredit", pengajuanKredit)
router.get("/contact", contact)
router.get("/testimoni", testomoni)

module.exports = router