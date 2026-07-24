const express = require("express");
const router = express.Router();

const {
    getWarnaByMotor,
    createWarna,
    updateWarna,
    deleteWarna,
    getAllWarna
} = require("../controllers/warnaController")

router.get("/:id", getWarnaByMotor)
router.get("/", getAllWarna)
router.post("/", createWarna)
router.put('/:id', updateWarna)
router.delete("/:id", deleteWarna)

module.exports = router