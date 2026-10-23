const db = require("../config/db");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "dealer-motor"
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


const getFotoMotor = (req, res) => {
    const { id_motor } = req.params;

    const sql = `
        SELECT 
            id_foto,
            id_motor,
            gambar,
            keterangan
        FROM foto_motor
        WHERE id_motor = ?
        ORDER BY id_foto DESC
    `;

    db.query(sql, [id_motor], (err, result) => {
        if (err) {
            console.error("ERROR FOTO MOTOR:", err);

            return res.status(500).json({
                success: false,
                message: "Gagal mengambil foto motor",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Data foto motor berhasil diambil",
            data: result
        });
    });
};


const addFotoMotor = async (req, res) => {
    try {
        const { id_motor, keterangan } = req.body;

        let gambar = null;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            gambar = result.secure_url;
        }

        if (!id_motor || !gambar) {
            return res.status(400).json({
                success: false,
                message: "ID motor dan gambar wajib diisi"
            });
        }

        const sql = `
            INSERT INTO foto_motor
            (id_motor, gambar, keterangan)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [id_motor, gambar, keterangan || null],
            (err, result) => {
                if (err) {
                    console.error("ERROR ADD FOTO:", err);

                    return res.status(500).json({
                        success: false,
                        message: "Gagal menambahkan foto motor",
                        error: err.message
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Foto motor berhasil ditambahkan",
                    id_foto: result.insertId
                });
            }
        );

    } catch (error) {
        console.error("ERROR CLOUDINARY:", error);

        res.status(500).json({
            success: false,
            message: "Gagal upload foto motor",
            error: error.message
        });
    }
};



const updateFotoMotor = async (req, res) => {
    try {
        const { id_foto } = req.params;
        const { keterangan } = req.body;
        console.log("PARAMS UPDATE FOTO:", req.params);
        console.log("ID FOTO:", req.params.id_foto);
        if (!id_foto) {
            return res.status(400).json({
                success: false,
                message: "ID foto tidak ditemukan"
            });
        }

        // Cari foto berdasarkan ID
        const checkSql = `
            SELECT id_foto, gambar
            FROM foto_motor
            WHERE id_foto = ?
        `;

        db.query(checkSql, [id_foto], async (err, rows) => {
            if (err) {
                console.error("ERROR CEK FOTO:", err);

                return res.status(500).json({
                    success: false,
                    message: "Gagal mencari foto motor",
                    error: err.message
                });
            }

            if (rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: `Foto dengan ID ${id_foto} tidak ditemukan`
                });
            }

            try {
                // Pertahankan gambar lama jika tidak ada gambar baru
                let gambar = rows[0].gambar;

                if (req.file) {
                    const result = await uploadToCloudinary(
                        req.file.buffer
                    );

                    gambar = result.secure_url;
                }

                const sql = `
                    UPDATE foto_motor
                    SET gambar = ?, keterangan = ?
                    WHERE id_foto = ?
                `;

                db.query(
                    sql,
                    [gambar, keterangan ?? null, id_foto],
                    (err, result) => {
                        if (err) {
                            console.error("ERROR UPDATE FOTO:", err);

                            return res.status(500).json({
                                success: false,
                                message: "Gagal mengubah foto motor",
                                error: err.message
                            });
                        }

                        return res.json({
                            success: true,
                            message: "Foto motor berhasil diupdate"
                        });
                    }
                );
            } catch (error) {
                console.error("ERROR UPLOAD CLOUDINARY:", error);

                return res.status(500).json({
                    success: false,
                    message: "Gagal mengupload foto baru",
                    error: error.message
                });
            }
        });
    } catch (error) {
        console.error("ERROR UPDATE FOTO:", error);

        return res.status(500).json({
            success: false,
            message: "Gagal mengubah foto motor",
            error: error.message
        });
    }
};



const deleteFotoMotor = (req, res) => {
    const { id_foto } = req.params;

    const sql = `
        DELETE FROM foto_motor
        WHERE id_foto = ?
    `;

    db.query(sql, [id_foto], (err, result) => {
        if (err) {
            console.error("ERROR DELETE FOTO:", err);

            return res.status(500).json({
                success: false,
                message: "Gagal menghapus foto motor",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Foto motor tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Foto motor berhasil dihapus"
        });
    });
};


module.exports = {
    getFotoMotor,
    addFotoMotor,
    updateFotoMotor,
    deleteFotoMotor
};