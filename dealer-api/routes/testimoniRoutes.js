const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
    getAllTestimoni,
    createTestimoni,
    deleteTestimoni,
    updateTestimoni
} = require("../controllers/testimoniController");

router.get("/", getAllTestimoni);

router.post(
    "/",
    upload.single("foto"),
    (req, res, next) => {
        console.log("🔥 ROUTE TESTIMONI TERPANGGIL");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        next();
    },
    createTestimoni
);
router.put(
    "/:id",
    upload.single("foto"),
    updateTestimoni
);

router.delete("/:id", deleteTestimoni);

module.exports = router;