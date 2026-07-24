const db = require("../config/db")

const getWarnaByMotor = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM warna
        WHERE id_motor = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil warna"
            });
        }

        res.json({
            success: true,
            data: result
        });

    });

};

const getAllWarna = (req, res) => {
    const sql = `
    SELECT
        w.id_warna,
        w.id_motor,
        m.nama_motor,
        w.nama_warna,
        w.kode_warna
    FROM warna w
    JOIN motor m
        ON w.id_motor = m.id_motor
    ORDER BY w.id_warna DESC
`;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil warna"
            });
        }

        res.json({
            success: true,
            data: result
        });
    });
};

const createWarna = (req, res) => {

    const {
        id_motor,
        nama_warna,
        kode_warna
    } = req.body;

    const sql = `
        INSERT INTO warna
        (
            id_motor,
            nama_warna,
            kode_warna
        )
        VALUES (?, ?, ?)
        `;

    db.query(sql, [
        id_motor,
        nama_warna,
        kode_warna
    ], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menambahkan"
            })
        }

        res.status(201).json({
            success: true,
            message: "warna berhasil",
            id: result.insertId
        })
    })
}

const updateWarna = (req, res) => {

    const { id } = req.params;

    const { id_motor, nama_warna, kode_warna } = req.body

    const sql = `
    
            UPDATE warna
            SET
            id_motor=?,
            nama_warna=?,
            kode_warna=?
        WHERE id_warna=?
    `;

    db.query(sql, [
        id_motor,
        nama_warna,
        kode_warna,
        id
    ], (err, result) => {

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "warna tidak di temukan"
            })
        }



        res.json({
            success: true,
            message: "berhasil"
        })
    }
    )
}

const deleteWarna = (req, res) => {

    const { id } = req.params;


    const sql = `
    
       DELETE FROM warna
       WHERE id_warna = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "gagal "
            })
        }

        res.json({
            success: true,
            message: "berhasil"
        })
    }
    )
}

module.exports = {
    getWarnaByMotor,
    getAllWarna,
    createWarna,
    updateWarna,
    deleteWarna
}