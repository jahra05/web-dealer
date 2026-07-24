const db = require("../config/db");

const getAllVarian = (req, res) => {

    const sql = `
    SELECT
        varian.id_varian,
        varian.nama_varian,
        tipe.id_tipe,
        tipe.nama_tipe
    FROM varian
    JOIN tipe
    ON varian.id_tipe = tipe.id_tipe
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data varian"
            });
        }

        res.json({
            success: true,
            message: "Data varian berhasil diambil",
            data: result
        });

    });

};

const createVarian = (req, res) => {
    const { nama_varian, id_tipe } = req.body;

    const sql = `
    INSERT INTO varian (nama_varian, id_tipe)
    VALUES (?, ?)
    `;

    db.query(sql, [nama_varian, id_tipe], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menambahkan varian"
            });
        }

        res.status(201).json({
            success: true,
            message: "Varian berhasil ditambahkan",
            id: result.insertId
        });

    });
};

const updateVarian = (req, res) => {
    const { id } = req.params;
    const { nama_varian, id_tipe } = req.body;

    const sql = `
    UPDATE varian
    SET nama_varian = ?, id_tipe = ?
    WHERE id_varian = ?
    `;

    db.query(sql, [nama_varian, id_tipe, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengupdate varian"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Varian tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Varian berhasil diupdate"
        });

    });
};

const deleteVarian = (req, res) => {
    const { id } = req.params;

    const sql = `
    DELETE FROM varian
    WHERE id_varian = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menghapus varian"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Varian tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Varian berhasil dihapus"
        });

    });
};
module.exports = {
    getAllVarian,
    createVarian,
    updateVarian,
    deleteVarian
};