const express = require("express");
const router = express.Router();

const motorController = require("../controllers/motorController");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

router.get("/", motorController.getAllMotor);
router.get("/:id", motorController.getMotorID);

router.post("/", verifyToken, upload.single("gambar"), motorController.createMotor);
router.put("/:id", verifyToken, upload.single("gambar"), motorController.updateMotor);
router.delete("/:id", verifyToken, motorController.deleteMotor);

module.exports = router;