const express = require("express");
const router = express.Router();

const {
    getAllContact,
    createContact,
    deleteContact,
    updatStatusContact
} = require("../controllers/contactController");

router.get("/", getAllContact);
router.post("/", createContact);
router.delete("/:id", deleteContact);
router.put("/:id/status", updatStatusContact)

module.exports = router;