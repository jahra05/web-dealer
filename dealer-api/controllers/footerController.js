const db = require('../config/db')

const getFooter = (req, res) => {
    const sql = `
    SELECT
    footer.id_footer,
    footer.nama_dealer,
    footer.logo,
    footer.deskripsi,
    footer.email,
    footer.no_hp,
    footer.whatsapp,
    footer.alamat,
    footer.google_maps,
    footer.instagram,
    footer.facebook,
    footer.tiktok,
    footer.youtube,
    footer.jam_senin_jumat,
    footer.jam_sabtu
    FROM footer
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'gagal mengambil data footer'
            })
        }

        res.json({
            success: true,
            message: "data footer berhasil diambil",
            data: result
        })
    })
}

const updateLogo = (req, res) => {
    const { id } = req.params;
    const logo = req.file.filename

    const sql = `
    UPDATE footer
    SET logo = ?
    WHERE id_footer = ?
    `;

    db.query(sql, [logo, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "gagal mengudate"
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "user gagal di update"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User berhasil diupdate"
        })
    })
}

const updateFooter = async (req, ress) => {
    const { id } = req.params;
    const {
        nama_dealer, deskripsi, email, no_hp, whatsapp, alamat, google_maps, instagram, facebook, tiktok, youtube,
        jam_senin_jumat, jam_sabtu
    } = req.body


    const sql = `
    UPDATE footer
    SET
    nama_dealer = ? ,
    deskripsi = ? ,
    email = ?,
    no_hp = ?,
    whatsapp = ?,
    alamat= ?,
    google_maps = ?,
    instagram = ?,
    facebook = ?,
    tiktok = ?,
    youtube = ?,
    jam_senin_jumat = ?,
    jam_sabtu = ?,
    WHERE id_footer = ?
    `;

    db.query(sql, [nama_dealer, deskripsi, email, no_hp, whatsapp,
        alamat, google_maps, instagram, facebook, tiktok, youtube, jam_senin_jumat, jam_sabtu, id,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "gagal mengupdate user"
                })
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "user gagal diupdate"
                })
            }
            return res.status(200).json({
                success: true,
                message: 'user berhasil diupdate'
            })

        }
    ])
}

module.exports = {
    getFooter,
    updateFooter,
    updateLogo
}