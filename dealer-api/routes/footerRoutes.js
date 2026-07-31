const express = require('express')
const router = express.Router();
const uploads = require('../middleware/upload')

const { getFooter, updateFooter, updateLogo } = require('../controllers/footerController')

router.get('/', getFooter)
router.put('/:id', updateFooter)
router.put('/:id/logo', uploads.single("logo"), updateLogo)
module.exports = router