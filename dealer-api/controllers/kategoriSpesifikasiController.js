const db = require("../config/db")

const getAllKategoriSpesifikasi = (req, res) => {
  const sql = `
    SELECT 
        id_kategori_spesifikasi,
        nama_kategori
    FROM kategori_spesifikasi
    ORDER BY id_kategori_spesifikasi ASC
`;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("ERROR KATEGORI SPESIFIKASI:", err);
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil kategori spesifikasi"
            })
        }

        res.status(200).json({
            success: true,
            data: result,
            message: "Berhasil mengambil ktegori spesifikasi"
        })
    })
}

const addKategoriSpesifikasi = (req, res) => {
    const { nama_kategori } = req.body

    if (!nama_kategori) {
        return res.status(400).json({
            success: false,
            message: "Nama kategori wajib disisi"
        })
    }

    const sql = ` INSERT INTO kategori_spesifikasi (nama_kategori) VALUES (?)`;

    db.query(sql, [nama_kategori], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menambahkan kategori spesifikasi"
            })
        }

        res.status(201).json({
            success: true,
            message: "Kategori spesifikasi berhasil ditambahkan",
            id_kategori_spesifikasi: result.insertId
        })
    })
}

const updateKategoriSpesifikasi = (req, res) => {
    const { id } = req.params
    const { nama_kategori } = req.body

    const sql = `
        UPDATE kategori_Spesifikasi
        SET nama_kategori = ?
        WHERE id_kategori_spesifikasi = ?
    `;

    db.query(sql, [nama_kategori, id], (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal Mengubah kategori spesifikasi"
            })
        }

        res.json({
            success: true,
            message: "Kategori spesifikasi berhasil diubah"
        })
    })
}

module.exports = {
    getAllKategoriSpesifikasi,
    addKategoriSpesifikasi,
    updateKategoriSpesifikasi
}