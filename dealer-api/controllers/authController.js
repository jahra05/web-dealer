const db = require("../config/db");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM user WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan pada database"
            });
        }

        // email tidak ditemukan
        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Username tidak ditemukan"
            });
        }

        const user = results[0];
        console.log("Password di database:", user.password);
        console.log("Password yang diinput:", password);

        const isMatch = await bcrypt.compare(password, user.password)
        // Password salah
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password salah"
            });
        }

        const token = jwt.sign(
            {
                id: user.id_user,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        // Login berhasil
        res.status(200).json({
            success: true,
            message: "Login berhasil",
            token: token,
            user: {
                id: user.id_user,
                email: user.email
            }
        });

    });
};


const forgotPassword = async (req, res) => {
    const { username, email, passwordBaru, konfirmasiPassword } = req.body;

    if (!username || !email || !passwordBaru || !konfirmasiPassword) {
        return res.status(400).json({
            success: false,
            message: "semua field wajib diisi"
        })
    }

    if (passwordBaru !== konfirmasiPassword) {
        return res.status(400).json({
            success: false,
            message: "konfimrasi password tidak sesuai"
        })
    }

    const sql = 'SELECT * FROM user WHERE username = ? AND email = ?';

    db.query(sql, [username, email], async (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "terjadi kesalahan pada databse"
            })
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "username dan email tidak ditemukan"
            })
        }
        const user = results[0]
        const hashPassword = await bcrypt.hash(passwordBaru, 10);
        const updateSql = "UPDATE user SET password = ? WHERE id_user = ?";
        db.query(
            updateSql,
            [hashPassword, user.id_user],
            (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Gagal mengubah password"
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: "Password berhasil diubah"
                });
            }
        );


    })


}

module.exports = {
    login,
    forgotPassword
};