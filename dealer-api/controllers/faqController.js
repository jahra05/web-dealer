const db = require("../config/db")

const getAllFaq = (req, res) => {
    const sql = `
    SELECT
        faq.id_faq,
        faq.pertanyaan,
        faq.jawaban
    FROM faq
    ORDER BY id_faq DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "gagal mengambil testimoni"
            })
        }
        res.json({
            success: true,
            message: "testimoni berhasil diambil",
            data: result
        })
    })
}

const createFaq = (req, res) => {

    const { pertanyaan, jawaban } = req.body;

    const sql = `
        INSERT INTO faq
        (
            pertanyaan,
            jawaban
        )
        VALUES (?, ?)
    `;

    db.query(sql, [pertanyaan, jawaban], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menambahkan FAQ",
                error: err
            });
        }

        res.status(201).json({
            success: true,
            message: "FAQ berhasil ditambahkan",
            data: {
                id_faq: result.insertId,
                pertanyaan,
                jawaban
            }
        });

    });

};

const deleteFaq = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM faq
        WHERE id_faq = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menghapus testimoni",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Testimoni tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Testimoni berhasil dihapus"
        });

    });

}
const updateFaq = (req, res) => {
    const { id } = req.params;
    const { pertanyaan, jawaban } = req.body;

    const sql = `
        UPDATE faq
        SET
            pertanyaan = ?,
            jawaban = ?
        WHERE id_faq = ?
    `;

    db.query(sql, [pertanyaan, jawaban, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengupdate FAQ",
                error: err
            });
        }

        res.json({
            success: true,
            message: "FAQ berhasil diupdate"
        });

    });
};

module.exports = {
    getAllFaq,
    createFaq,
    deleteFaq,
    updateFaq
}