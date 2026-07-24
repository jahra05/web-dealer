const db = require("../config/db")

const getAllTestimoni = (req, res) => {
    const sql = `
    SELECT
        testimoni.id_testimoni,
        testimoni.nama,
        testimoni.pekerjaan,
        testimoni.isi_testimoni,
        testimoni.rating,
        testimoni.foto
    FROM testimoni
    ORDER BY id_testimoni DESC
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

const createTestimoni = (req, res) => {

    const {
        nama,
        pekerjaan,
        isi_testimoni,
        rating
    } = req.body;

    const foto = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO testimoni
        (
            nama,
            pekerjaan,
            isi_testimoni,
            rating,
            foto
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nama, pekerjaan, isi_testimoni, rating, foto],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal menambahkan testimoni",
                    error: err
                });
            }

            res.status(201).json({
                success: true,
                message: "Testimoni berhasil ditambahkan",
                data: {
                    id: result.insertId,
                    nama,
                    pekerjaan,
                    isi_testimoni,
                    rating,
                    foto
                }
            });

        }
    );

};

const deleteTestimoni = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM testimoni
        WHERE id_testimoni = ?
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

const updateTestimoni = (req, res) => {
    const { id } = req.params;

    const {
        nama, pekerjaan, isi_testimoni, rating
    } = req.body;
    const foto = req.file ? req.file.filename : null
    let sql;
    let values;

    if (foto) {
        sql = `
            UPDATE testimoni
            SET
                nama=?,
                pekerjaan=?,
                isi_testimoni=?,
                rating=?,
                foto=?
            WHERE id_testimoni=?
        `;

        values = [
            nama, pekerjaan, isi_testimoni, rating, foto, id
        ]
    } else {
        sql = `
            UPDATE testimoni
            SET
                nama=?,
                pekerjaan=?,
                isi_testimoni=?,
                rating=?
            WHERE id_testimoni=?
        `;

        values = [
            nama,
            pekerjaan,
            isi_testimoni,
            rating,
            id
        ];
    }

    db.query(sql, values, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "gagal update testimoni",
                error: err
            })
        }

        res.json({
            success: true,
            message: "Testimoni berhasil diupdate"
        })
    })
}

module.exports = {
    getAllTestimoni,
    createTestimoni,
    deleteTestimoni,
    updateTestimoni
}