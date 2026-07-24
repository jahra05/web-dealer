const db = require("../config/db");

// =========================
// GET ALL PENGAJUAN
// =========================
const getAllPengajuan = (req, res) => {

    const sql = `
    SELECT
        pengajuan.id_pengajuan,
        pengajuan.nama,
        pengajuan.no_hp,
        pengajuan.alamat,
        pengajuan.pekerjaan,
        pengajuan.status,
        pengajuan.tanggal_pengajuan,

        motor.id_motor,
        motor.nama_motor,
        motor.harga,
        motor.gambar

    FROM pengajuan
    JOIN motor
        ON pengajuan.id_motor = motor.id_motor
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data pengajuan"
            });
        }

        res.json({
            success: true,
            message: "Data pengajuan berhasil diambil",
            data: result
        });

    });

};

// =========================
// GET PENGAJUAN BY ID
// =========================
const getPengajuanById = (req, res) => {

    const { id } = req.params;

    const sql = `
    SELECT
        pengajuan.id_pengajuan,
        pengajuan.nama,
        pengajuan.no_hp,
        pengajuan.alamat,
        pengajuan.pekerjaan,
        pengajuan.status,
        pengajuan.tanggal_pengajuan,

        motor.id_motor,
        motor.nama_motor,
        motor.harga,
        motor.gambar

    FROM pengajuan
    JOIN motor
        ON pengajuan.id_motor = motor.id_motor

    WHERE pengajuan.id_pengajuan = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Pengajuan gagal dimuat"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Pengajuan tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Pengajuan berhasil dimuat",
            data: result[0]
        });

    });

};

// =========================
// CREATE PENGAJUAN
// =========================
const createPengajuan = (req, res) => {

    const {
        nama,
        no_hp,
        alamat,
        pekerjaan,
        id_motor
    } = req.body;

    const sql = `
    INSERT INTO pengajuan
    (
        nama,
        no_hp,
        alamat,
        pekerjaan,
        id_motor
    )
    VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            nama,
            no_hp,
            alamat,
            pekerjaan,
            id_motor
        ],
        (err, result) => {

            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "Gagal mengirim pengajuan",
                    error: err
                });
            }

            res.status(201).json({
                success: true,
                message: "Pengajuan berhasil dikirim",
                id: result.insertId
            });

        }
    );

};

// =========================
// UPDATE STATUS PENGAJUAN
// =========================
const updatePengajuan = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const sql = `
    UPDATE pengajuan
    SET status = ?
    WHERE id_pengajuan = ?
    `;

    db.query(sql, [status, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengupdate pengajuan"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Pengajuan tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Status pengajuan berhasil diupdate"
        });

    });

};

// =========================
// DELETE PENGAJUAN
// =========================
const deletePengajuan = (req, res) => {

    const { id } = req.params;

    const sql = `
    DELETE FROM pengajuan
    WHERE id_pengajuan = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menghapus pengajuan"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Pengajuan tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Pengajuan berhasil dihapus"
        });

    });

};

module.exports = {
    getAllPengajuan,
    getPengajuanById,
    createPengajuan,
    updatePengajuan,
    deletePengajuan
};