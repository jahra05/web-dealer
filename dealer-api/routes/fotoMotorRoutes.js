const express = require("express");

const router = express.Router();

const fotoMotorController = require("../controllers/fotoMotorController");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

router.get("/:id_motor", fotoMotorController.getFotoMotor);

router.post(
    "/",
    verifyToken,
    upload.single("gambar"),
    fotoMotorController.addFotoMotor
);

router.put(
    "/:id_foto",
    verifyToken,
    upload.single("gambar"),
    fotoMotorController.updateFotoMotor
);

router.delete(
    "/:id_foto",
    verifyToken,
    fotoMotorController.deleteFotoMotor
);

module.exports = router;