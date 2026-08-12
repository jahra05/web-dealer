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
        motor.gambar
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
    const { id } = req.params;

    const sql = "DELETE FROM motor WHERE id_motor = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "Hapus dulu Di tabel pengajuan produk"
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
            message: "Motor berhasil dihapus"
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