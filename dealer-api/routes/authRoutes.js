const express = require("express")
const router = express.Router();

const { login, forgotPassword, sendOtp } = require("../controllers/authController");

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/sendOtp", sendOtp)

module.exports = router;