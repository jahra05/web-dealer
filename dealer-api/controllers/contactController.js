const db = require("../config/db");

const getAllContact = (req, res) => {
    const sql = `
        SELECT
            id_message,
            nama,
            email,
            no_hp,
            subjek,
            pesan,
            status,
            created_at
        FROM contact
        ORDER BY id_message DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil contact"
            });
        }

        res.json({
            success: true,
            message: "Contact berhasil diambil",
            data: result
        });
    });
};

const createContact = (req, res) => {
    const {
        nama,
        email,
        no_hp,
        subjek,
        pesan
    } = req.body;

    const sql = `
        INSERT INTO contact
        (
            nama,
            email,
            no_hp,
            subjek,
            pesan,
            status
        )
        VALUES (?, ?, ?, ?, ?, "Belum Dibaca")
    `;

    db.query(sql, [nama, email, no_hp, subjek, pesan], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menambahkan contact",
                error: err
            });
        }

        res.status(201).json({
            success: true,
            message: "Contact berhasil ditambahkan",
            data: {
                id_message: result.insertId,
                nama,
                email,
                no_hp,
                subjek,
                pesan,
                status: "Belum Dibaca"
            }
        });
    });
};

const deleteContact = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM contact
        WHERE id_message = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menghapus contact",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Contact berhasil dihapus"
        });
    });
};

const updatStatusContact = (req, res) => {
    const { id } = req.params;

    const sql = `
        UPDATE contact
        SET status = 'Sudah Dibaca'
        WHERE id_message = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengubah status",
                error: err
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "pesam tidak ditemukan"
            })
        }

        res.json({
            success: true,
            message: "status berjasil diperbarui"
        })
    })
}

module.exports = {
    getAllContact,
    createContact,
    deleteContact,
    updatStatusContact
};