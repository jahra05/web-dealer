const express = require("express");
const router = express.Router();

const {
    getAllFaq,
    createFaq,
    deleteFaq,
    updateFaq
} = require("../controllers/faqController");

router.get("/", getAllFaq);
router.post("/", createFaq);
router.delete("/:id", deleteFaq);
router.put("/:id", updateFaq)

module.exports = router;