const db = require("../config/db")

const getUser = (req, res) => {
    const sql = `
    SELECT 
    user.id_user,
    user.nama_lengkap,
    user.username,
    user.email,
    user.password,
    user.foto
    FROM user
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "gagal mengambil data user"
            })
        }

        res.json({
            success: true,
            message: 'data user berhasil diambil',
            data: result
        })
    })

}
const updateProfile = (req, res) => {
    const { id } = req.params;
    const profile = req.file.filename

    const sql = `
    UPDATE user
    SET foto = ?
    WHERE id_user = ?
    `;

    db.query(sql, [profile, id], (err, result) => {
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

const upadteUser = async (req, res) => {
    const { id } = req.params;
    const { nama_lengkap, username, email } = req.body;

    console.log(req.body);
    console.log(req.file)

    const sql = `UPDATE user SET  nama_lengkap = ?, username = ? , email = ?  WHERE id_user = ?`;

    db.query(sql, [nama_lengkap, username, email, id], (err, result) => {
        console.log(result)
        if (err) {
            return res.status(500).json({
                success: false,
                message: "gagal mengupadate user"
            });
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

const changePassword = async (req, res) => {
    const { id } = req.params
    const { passwordBaru, passwordLama } = req.body

    const sql = `
    SELECT 
    user.password
    FROM user
    WHERE id_user = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "gagal mengambil data user"
            })
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan'
            })
        }

        if (result[0].password !== passwordLama) {
            return res.status(400).json({
                success: false,
                message: "passwod lama salah"
            })
        }

        const sqlUpdate = `
        UPDATE user 
        SET password = ? 
        WHERE id_user = ?`

        db.query(sqlUpdate, [passwordBaru, id], (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "gagal"
                })
            }

            return res.status(200).json({
                success: true,
                messageF: "passowrd baru",
                data: result[0]
            })
        })
    })
}
module.exports = {
    getUser,
    upadteUser,
    updateProfile,
    changePassword
}