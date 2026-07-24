const db = require("../config/db");

// =======================
// GET ALL SIMULASI
// =======================
const getAllSimulasi = (req, res) => {

    const sql = `
        SELECT
            simulasi_kredit.id_simulasi,
            simulasi_kredit.dp,
            simulasi_kredit.tenor,
            simulasi_kredit.bunga,
            simulasi_kredit.cicilan,

            motor.id_motor,
            motor.nama_motor,
            motor.harga,
            motor.gambar

        FROM simulasi_kredit
        JOIN motor
            ON simulasi_kredit.id_motor = motor.id_motor
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data simulasi"
            });
        }

        res.json({
            success: true,
            message: "Data simulasi berhasil diambil",
            data: result
        });

    });

};

// =======================
// GET SIMULASI BY ID
// =======================
const getSimulasiById = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            simulasi_kredit.id_simulasi,
            simulasi_kredit.dp,
            simulasi_kredit.tenor,
            simulasi_kredit.bunga,
            simulasi_kredit.cicilan,

            motor.id_motor,
            motor.nama_motor,
            motor.harga,
            motor.gambar

        FROM simulasi_kredit
        JOIN motor
            ON simulasi_kredit.id_motor = motor.id_motor

        WHERE simulasi_kredit.id_simulasi = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data simulasi"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Simulasi tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Data simulasi berhasil diambil",
            data: result[0]
        });

    });

};

// =======================
// CREATE SIMULASI
// =======================
const createSimulasi = (req, res) => {

    const {
        id_motor,
        dp,
        tenor,
        bunga,
        cicilan
    } = req.body;

    const sql = `
        INSERT INTO simulasi_kredit
        (
            id_motor,
            dp,
            tenor,
            bunga,
            cicilan
        )
        VALUES (?, ?, ?, ?,?)
    `;

    db.query(
        sql,
        [
            id_motor,
            dp,
            tenor,
            bunga,
            cicilan
        ],
        (err, result) => {

            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "Gagal menambahkan simulasi",
                    error: err
                });
            }

            res.status(201).json({
                success: true,
                message: "Simulasi berhasil ditambahkan",
                id: result.insertId
            });

        }
    );

};

// =======================
// UPDATE SIMULASI
// =======================
const updateSimulasi = (req, res) => {

    const { id } = req.params;

    const {
        id_motor,
        dp,
        tenor,
        bunga,
        cicilan
    } = req.body;

    const sql = `
        UPDATE simulasi_kredit
        SET
            id_motor = ?,
            dp = ?,
            tenor = ?,
            bunga = ?,
            cicilan = ?
        WHERE id_simulasi = ?
    `;

    db.query(
        sql,
        [
            id_motor,
            dp,
            tenor,
            bunga,
            cicilan,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal mengupdate simulasi"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Simulasi tidak ditemukan"
                });
            }

            res.json({
                success: true,
                message: "Simulasi berhasil diupdate"
            });

        }
    );

};

// =======================
// DELETE SIMULASI
// =======================
const deleteSimulasi = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM simulasi_kredit
        WHERE id_simulasi = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menghapus simulasi"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Simulasi tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Simulasi berhasil dihapus"
        });

    });

};

module.exports = {
    getAllSimulasi,
    getSimulasiById,
    createSimulasi,
    updateSimulasi,
    deleteSimulasi
};