const db = require("../config/db")

const getAllSpesifikasi = (req, res) => {

    const sql = `
        SELECT 
            s.id_spesifikasi,
            s.id_motor,
            m.nama_motor,
            s.id_kategori_spesifikasi,
            k.nama_kategori,
            s.nama_spesifikasi,
            s.nilai
        FROM spesifikasi_motor s
        JOIN motor m
            ON s.id_motor = m.id_motor
        JOIN kategori_spesifikasi k
            ON s.id_kategori_spesifikasi = k.id_kategori_spesifikasi
            ORDER BY s.id_spesifikasi DESC
    `;
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "gagal mengambil data spesifikasi"
            })
        }

        res.json({
            success: true,
            data: result
        })
    })
}

const getSpesifikasi = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            s.id_spesifikasi,
            s.id_motor,
            m.nama_motor,
            s.id_kategori_spesifikasi,
            k.nama_kategori,
            s.nama_spesifikasi,
            s.nilai
        FROM spesifikasi_motor s
           JOIN motor m
        ON s.id_motor = m.id_motor
        JOIN kategori_spesifikasi k
            ON s.id_kategori_spesifikasi = k.id_kategori_spesifikasi
        WHERE s.id_motor = ?
        ORDER BY k.id_kategori_spesifikasi ASC, s.id_spesifikasi ASC
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil spesifikasi motor"
            })
        }

        res.json({
            success: true,
            data: result
        })
    })
}



const createAllSpesifikasi = (req, res) => {

    const {
        id_motor,
        id_kategori_spesifikasi,
        nama_spesifikasi,
        nilai
    } = req.body;

    if (!id_motor || !id_kategori_spesifikasi || !nama_spesifikasi || !nilai) {
        return res.status(400).json({
            success: false,
            message: "Semua data spesifikasi wajib diisi"
        })
    }
    const sql = `
    
        INSERT INTO spesifikasi_motor
        (
            id_motor,
            id_kategori_spesifikasi,
            nama_spesifikasi,
            nilai
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [
        id_motor,
        id_kategori_spesifikasi,
        nama_spesifikasi,
        nilai
    ], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "gagal menambahkan spesifikasi"
            })
        }

        res.status(201).json({
            success: true,
            message: "spesifikasi berhasil ditambahkan",
            id_spesifikasi: result.insertId
        })
    })
}

const updateSpesifikasi = (req, res) => {

    const { id } = req.params;

    const {
        id_motor,
        id_kategori_spesifikasi,
        nama_spesifikasi,
        nilai
    } = req.body

    const sql = `
    
        UPDATE spesifikasi_motor 
        SET 
            id_motor=?,
            id_kategori_spesifikasi=?,
            nama_spesifikasi=?,
            nilai=?
        WHERE id_spesifikasi=?
    `;

    db.query(
        sql,
        [
            id_motor,
            id_kategori_spesifikasi,
            nama_spesifikasi,
            nilai,
            id
        ], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "Gagal mengubah spesifikasi"
                })
            }

            res.json({
                success: true,
                message: "Spesifikasi berhasil diubah"
            })
        }
    )
}

const deleteSpesifikasi = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM spesifikasi_motor
            WHERE id_spesifikasi = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "gagal menghaspud spek"
            })
        }

        res.json({
            success: true,
            message: "spek berhasil dihapus"
        })
    })
}

module.exports = {
    getAllSpesifikasi,
    getSpesifikasi,
    createAllSpesifikasi,
    updateSpesifikasi,
    deleteSpesifikasi
}