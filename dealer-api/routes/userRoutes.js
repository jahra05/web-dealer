const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const { getUser, upadteUser, changePassword, updateProfile } = require('../controllers/userController')

router.get('/', getUser)
router.put('/:id', upadteUser)
router.put('/:id/foto', upload.single('foto'), updateProfile)
router.put('/:id/password', changePassword)
module.exports = router;