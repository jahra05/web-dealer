const db = require("../config/db")

const getAllSpesifikasi = (req, res) => {

    const sql = `
        SELECT 
            s.*,
            m.nama_motor
            FROM spesifikasi_motor s
            JOIN motor m
                ON s.id_motor = m.id_motor
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

    SELECT * 
    FROM spesifikasi_motor
    WHERE id_motor = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
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
        kapasitas_mesin,
        tenaga,
        torsi,
        transmisi,
        berat,
        tinggi_jok,
        kapasitas_tengki,
        mesin
    } = req.body;

    const sql = `
    
        INSERT INTO spesifikasi_motor
        (
            id_motor,
            kapasitas_mesin,
            tenaga,
            torsi,
            transmisi,
            berat,
            tinggi_jok,
            kapasitas_tengki,
            mesin
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        id_motor,
        kapasitas_mesin,
        tenaga,
        torsi,
        transmisi,
        berat,
        tinggi_jok,
        kapasitas_tengki,
        mesin
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
            message: "spesifikasi berhasil ditambahkan"
        })
    })
}

const updateSpesifikasi = (req, res) => {

    const { id } = req.params;

    const {
        id_motor,
        kapasitas_mesin,
        tenaga,
        torsi,
        transmisi,
        berat,
        tinggi_jok,
        kapasitas_tengki,
        mesin
    } = req.body

    const sql = `
    
        UPDATE spesifikasi_motor 
        SET 
            id_motor=?,
            kapasitas_mesin=?,
            tenaga=?,
            torsi=?,
            transmisi=?,
            berat=?,
            tinggi_jok=?,
            kapasitas_tengki=?,
            mesin=?
        WHERE id_spesifikasi=?
    `;

    db.query(
        sql,
        [
            id_motor,
            kapasitas_mesin,
            tenaga,
            torsi,
            transmisi,
            berat,
            tinggi_jok,
            kapasitas_tengki,
            mesin,
            id
        ], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "fafla mengambil spec"
                })
            }

            res.json({
                success: true,
                message: "berhasi di ubah"
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