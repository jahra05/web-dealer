const express = require("express");
const cors = require("cors");

require('dotenv').config();

const db = require('./config/db')
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/verifyToken")
const kategoriRoutes = require("./routes/kategoriRoutes")
const tipeRoutes = require("./routes/tipeRoutes")
const varianRoutes = require("./routes/varianRoutes");
const motorRoutes = require("./routes/motorRoutes");
const pengajuanRoutes = require("./routes/pengajuanRoutes")
const simulasiRoutes = require("./routes/simulasiRoutes");
const testmoniRoutes = require("./routes/testimoniRoutes")
const faqRoutes = require("./routes/faqRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")
const contactRoutes = require("./routes/contactRoutes")
const spesifikasiRoutes = require("./routes/spesifikasiRoutes")
const warnaRoutes = require("./routes/warnaRoutes")
const laporanStatus = require("./routes/laporanRoutes")
const user = require('./routes/userRoutes')
const footer = require('./routes/footerRoutes')
const hero = require("./routes/heroRoutes")

const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/kategori", kategoriRoutes);
app.use("/api/tipe", tipeRoutes)
app.use("/api/varian", varianRoutes);
app.use("/api/motor", motorRoutes);
app.use("/uploads", express.static("uploads"))
app.use("/api/pengajuan", pengajuanRoutes)
app.use("/api/simulasi", simulasiRoutes);
app.use("/api/testimoni", testmoniRoutes)
app.use("/api/faq", faqRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/spesifikasi", spesifikasiRoutes)
app.use("/api/warna", warnaRoutes)
app.use("/api/laporan", laporanStatus)
app.use("/api/user", user)
app.use("/api/footer", footer)
app.use("/api/hero", hero)

app.get("/", (req, res) => {
    res.send("API Dealer Motor")
})

app.get("/api/test", verifyToken, (req, res) => {
    res.json({
        success: true,
        message: "Token berhasil diverifikasi"
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server berjalan");
});