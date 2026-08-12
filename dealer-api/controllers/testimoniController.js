const db = require("../config/db");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "dealer-motor/testimoni",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(fileBuffer);
    });
};

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


const createTestimoni = async (req, res) => {

    console.log("========== CREATE TESTIMONI ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
        nama,
        pekerjaan,
        isi_testimoni,
        rating
    } = req.body;

    try {

        let foto = null;
        console.log("===== UPDATE PROFILE =====");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log("FILE BUFFER:", req.file?.buffer?.length);
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);

            console.log("HASIL CLOUDINARY:", result);

            foto = result.secure_url;

            console.log("URL FOTO:", foto);
        }

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
                    console.error("ERROR DATABASE:", err);

                    return res.status(500).json({
                        success: false,
                        message: "Gagal menambahkan testimoni",
                        error: err.message
                    });
                }

                return res.status(201).json({
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

    } catch (error) {

        console.error("ERROR UPLOAD:", error);

        return res.status(500).json({
            success: false,
            message: "Gagal upload foto",
            error: error.message
        });
    }
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

const updateTestimoni = async (req, res) => {
    const { id } = req.params;

    const {
        nama, pekerjaan, isi_testimoni, rating
    } = req.body;

    try {
        let foto = null;

        // Kalau upload foto baru
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);

            console.log("HASIL CLOUDINARY UPDATE:", result);

            foto = result.secure_url;

            console.log("URL FOTO BARU:", foto);
        }

        let sql;
        let values;

        if (foto) {
            sql = `
                UPDATE testimoni
                SET
                    nama = ?,
                    pekerjaan = ?,
                    isi_testimoni = ?,
                    rating = ?,
                    foto = ?
                WHERE id_testimoni = ?
            `;

            values = [
                nama,
                pekerjaan,
                isi_testimoni,
                rating,
                foto,
                id
            ];

        } else {
            sql = `
                UPDATE testimoni
                SET
                    nama = ?,
                    pekerjaan = ?,
                    isi_testimoni = ?,
                    rating = ?
                WHERE id_testimoni = ?
            `;

            values = [
                nama,
                pekerjaan,
                isi_testimoni,
                rating,
                id
            ];
        }

        db.query(sql, values, (err, result) => {

            if (err) {
                console.error("ERROR DATABASE:", err);

                return res.status(500).json({
                    success: false,
                    message: "Gagal update testimoni",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Testimoni tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Testimoni berhasil diupdate",
                foto: foto
            });
        });

    } catch (error) {
        console.error("ERROR CLOUDINARY:", error);

        return res.status(500).json({
            success: false,
            message: "Gagal upload foto testimoni",
            error: error.message
        });
    }
}

module.exports = {
    getAllTestimoni,
    createTestimoni,
    deleteTestimoni,
    updateTestimoni
}