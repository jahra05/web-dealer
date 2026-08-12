const db = require("../config/db")
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
const updateProfile = async (req, res) => {
    const { id } = req.params;

    try {
        console.log("========== UPDATE FOTO ==========");
        console.log("ID USER:", id);
        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File foto tidak ditemukan"
            });
        }

        // Upload buffer ke Cloudinary
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

        console.log("HASIL CLOUDINARY:", cloudinaryResult);

        const foto = cloudinaryResult.secure_url;

        console.log("URL FOTO:", foto);

        const sql = `
            UPDATE user
            SET foto = ?
            WHERE id_user = ?
        `;

        db.query(sql, [foto, id], (err, result) => {

            if (err) {
                console.error("ERROR DATABASE:", err);

                return res.status(500).json({
                    success: false,
                    message: "Gagal mengupdate foto",
                    error: err.message
                });
            }

            console.log("HASIL UPDATE DATABASE:", result);

            return res.status(200).json({
                success: true,
                message: "Foto profil berhasil diupdate",
                foto: foto,
                affectedRows: result.affectedRows,
                changedRows: result.changedRows
            });
        });

    } catch (error) {
        console.error("ERROR CLOUDINARY:", error);

        return res.status(500).json({
            success: false,
            message: "Gagal upload foto",
            error: error.message
        });
    }
};

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