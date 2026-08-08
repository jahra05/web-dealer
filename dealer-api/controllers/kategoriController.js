const db = require("../config/db")

const getAllKategori = (req, res) => {
    const sql = "SELECT * FROM kategori"

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data kategori"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data Kategori berhsil diambil",
            data: result

        })
    })
}


const addKategori = (req, res) => {
    const { nama_kategori } = req.body;

    if (!nama_kategori) {
        return res.status(400).json({
            success: false,
            message: "Nama kategori wajib di isi"
        })
    }

    const sql = "INSERT INTO kategori (nama_kategori) VALUES (?)";

    db.query(sql, [nama_kategori], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menambahkakn kategori"
            })
        }

        res.status(201).json({
            success: true,
            message: "kategori berhasil ditambahkan",
            id: result.insertId
        })
    })
}

const updateKategori = (req, res) => {
    const { id_kategori } = req.params;
    const { nama_kategori } = req.body;

    if (!nama_kategori) {
        return res.status(400).json({
            success: false,
            message: "Nama kategori wajib di isi"
        })
    }

    const sql = `
    UPDATE kategori
    SET nama_kategori = ? 
    WHERE id_kategori = ? 
    `;

    db.query(sql, [nama_kategori, id_kategori], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "gagal mengubah kategori"
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "kategori tidak ditemukan"
            })
        }

        res.json({
            success : true, 
            message : "kategori berhasil diupdate"
        })
    })
}

const deleteKategori = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM kategori WHERE id_kategori = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menghapus kategori"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            message: "Kategori berhasil dihapus"
        });

    });

};

module.exports = {
    getAllKategori,
    addKategori,
    updateKategori,
    deleteKategori
}