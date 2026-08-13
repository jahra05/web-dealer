const db = require("../config/db");
const cloudinary = require("../config/cloudinary")

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'dealer-motor'
            },
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }
        );
        stream.end(fileBuffer)
    })
}

const getAllMotor = (req, res) => {

    const sql = `
    SELECT
        motor.id_motor,
        motor.nama_motor,
        kategori.id_kategori,
        kategori.nama_kategori,
        tipe.id_tipe,
        tipe.nama_tipe,
        motor.harga,
        motor.stok,
        motor.tahun,
        motor.deskripsi,
        motor.gambar,
        motor.status
    FROM motor
    JOIN kategori ON motor.id_kategori = kategori.id_kategori
    JOIN tipe ON motor.id_tipe = tipe.id_tipe
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data motor"
            });
        }

        res.json({
            success: true,
            message: "Data motor berhasil diambil",
            data: result
        });

    });

};

const getMotorID = (req, res) => {

    const { id } = req.params;

    const sql = `
    SELECT
        motor.id_motor,
        motor.nama_motor,
        kategori.id_kategori,
        kategori.nama_kategori,
        tipe.id_tipe,
        tipe.nama_tipe,
        motor.harga,
        motor.stok,
        motor.tahun,
        motor.deskripsi,
        motor.gambar
    FROM motor
    JOIN kategori ON motor.id_kategori = kategori.id_kategori
    JOIN tipe ON motor.id_tipe = tipe.id_tipe
    WHERE motor.id_motor = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data motor"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Motor tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Data motor berhasil diambil",
            data: result[0]
        });

    });

};
const createMotor = async (req, res) => {

    const {
        nama_motor,
        id_kategori,
        id_tipe,
        harga,
        stok,
        tahun,
        deskripsi,
    } = req.body;
    // const gambar = req.file ? req.file.filename : null;
    console.log("===== UPDATE PROFILE =====");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("FILE BUFFER:", req.file?.buffer?.length);
    let gambar = null;
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer);
        gambar = result.secure_url
    }
    const sql = `
    INSERT INTO motor
    (
        nama_motor,
        id_kategori,
        id_tipe,
        harga,
        stok,
        tahun,
        deskripsi,
        gambar
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?  )
    `;

    db.query(sql,
        [
            nama_motor,
            id_kategori,
            id_tipe,
            harga,
            stok,
            tahun,
            deskripsi,
            gambar
        ],
        (err, result) => {

            if (err) {
                console.error("myssql Error", err)
                return res.status(500).json({
                    success: false,
                    message: "Gagal menambahkan motor",
                    error: err
                });
            }

            res.status(201).json({
                success: true,
                message: "Motor berhasil ditambahkan",
                id: result.insertId
            });

        });

};

const updateMotor = async (req, res) => {

    const { id } = req.params;

    const {
        nama_motor,
        id_kategori,
        id_tipe,
        harga,
        stok,
        tahun,
        deskripsi,
    } = req.body;
    let gambar = req.body.gambar;
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer);
        gambar = result.secure_url
    }
    const sql = `
    UPDATE motor
    SET
        nama_motor = ?,
        id_kategori = ?,
        id_tipe = ?,
        harga = ?,
        stok = ?,
        tahun = ?,
        deskripsi = ?,
        gambar = ?
    WHERE id_motor = ?
    `;

    db.query(sql, [
        nama_motor,
        id_kategori,
        id_tipe,
        harga,
        stok,
        tahun,
        deskripsi,
        gambar,
        id
    ], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengupdate motor"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Motor tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Motor berhasil diupdate"
        });

    });

};

const deleteMotor = (req, res) => {
    console.log("🔥 DELETE MOTOR BARU DIPANGGIL");
    console.log("ID MOTOR:", req.params.id);

    const { id } = req.params;

    const checkRelasi = `
        SELECT
            (SELECT COUNT(*)
             FROM pengajuan
             WHERE id_motor = ?) AS jumlah_pengajuan,

            (SELECT COUNT(*)
             FROM simulasi_kredit
             WHERE id_motor = ?) AS jumlah_simulasi
    `;

    db.query(checkRelasi, [id, id], (err, result) => {

        if (err) {
            console.error("❌ Error cek relasi motor:", err);

            return res.status(500).json({
                success: false,
                message: "Gagal mengecek data motor",
                error: err.message
            });
        }

        const jumlahPengajuan = result[0].jumlah_pengajuan;
        const jumlahSimulasi = result[0].jumlah_simulasi;

        console.log("📌 Jumlah pengajuan:", jumlahPengajuan);
        console.log("📌 Jumlah simulasi:", jumlahSimulasi);

        // ==========================================
        // MOTOR MASIH DIGUNAKAN
        // ==========================================

        if (jumlahPengajuan > 0 || jumlahSimulasi > 0) {

            const updateStatus = `
                UPDATE motor
                SET status = 'Nonaktif'
                WHERE id_motor = ?
            `;

            db.query(updateStatus, [id], (err, result) => {

                if (err) {
                    console.error("❌ Error menonaktifkan motor:", err);

                    return res.status(500).json({
                        success: false,
                        message: "Gagal menonaktifkan motor",
                        error: err.message
                    });
                }

                return res.json({
                    success: true,
                    message: "Motor dinonaktifkan karena masih digunakan dalam data transaksi"
                });
            });

            return;
        }

        // ==========================================
        // MOTOR TIDAK DIGUNAKAN
        // ==========================================

        const deleteSql = `
            DELETE FROM motor
            WHERE id_motor = ?
        `;

        db.query(deleteSql, [id], (err, result) => {

            if (err) {
                console.error("❌ Error delete motor:", err);

                return res.status(500).json({
                    success: false,
                    message: "Gagal menghapus motor",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Motor tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Motor berhasil dihapus"
            });
        });
    });
};
module.exports = {
    getAllMotor,
    getMotorID,
    createMotor,
    updateMotor,
    deleteMotor
};