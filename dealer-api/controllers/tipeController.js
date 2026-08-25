const db = require("../config/db")

const getAllTipe = (req, res) => {
    const sql = `
    SELECT 
    tipe.id_tipe,
    tipe.nama_tipe,
    tipe.status,
    kategori.id_kategori,
    kategori.nama_kategori
    FROM tipe JOIN kategori ON tipe.id_kategori = kategori.id_kategori
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "gagal mengambil data tipe"
            })
        }

        res.status(200).json({
            success: true,
            message: "data tipe berhasil diambil",
            data: result
        })
    })
}

const createTipe = (req, res) => {
    const { nama_tipe, id_kategori } = req.body;

    const sql = `
    INSERT INTO tipe (nama_tipe, id_kategori) VALUES (?, ?)
    `;

    db.query(sql, [nama_tipe, id_kategori], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menambahkan tipe",
            })
        }

        res.status(201).json({
            success: true,
            message: "Tipe berhasil ditambahkan",
            id: result.insertId
        })
    })
}

const updateStatusTipe = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            success: false,
            message: "Status wajib disis"
        })
    }

    if (!['Aktif', 'Nonaktif'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "status tidak valid"
        })
    }

    const sql = ` UPDATE tipe SET status = ? WHERE id_tipe = ? `;

    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("Erro update status tipe", err);
            return res.status(500).json({
                success: false,
                message: "Gagal mengubha status tipe"
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "tipe berhasil di ubah"
            })
        }
    })
}


const updateTipe = (req, res) => {
    const { id } = req.params;
    const { nama_tipe, id_kategori } = req.body;

    const sql = `
    UPDATE tipe
    SET nama_tipe = ?, id_kategori = ?
    WHERE id_tipe = ?
    `;

    db.query(sql, [nama_tipe, id_kategori, id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal mengupdate tipe",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Tipe tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Tipe berhasil diupdate"
        });
    });
};

const deleteTipe = (req, res) => {
    const { id } = req.params

    const sql = `
    UPDATE tipe
    SET status = 'Nonaktif'
    WHERE id_tipe = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengapus tipe"
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Tipe tidak ditemukan"
            })
        }
        res.json({
            success: true,
            message: "tipe berhasi dihapus"
        })
    })
}

const updateVarian = (req, res) => {
    const { id } = req.params;
    const { nama_varian, id_tipe } = req.body;

    const sql = `
    UPDATE varian
    SET nama_varian = ?, id_tipe = ?
    WHERE id_varian = ?
    `;

    db.query(sql, [nama_varian, id_tipe, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengupdate varian"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Varian tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Varian berhasil diupdate"
        });

    });
};


module.exports = {
    getAllTipe,
    createTipe,
    updateTipe,
    deleteTipe,
    updateStatusTipe
}