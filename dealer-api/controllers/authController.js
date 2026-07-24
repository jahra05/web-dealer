const db = require("../config/db");
const jwt = require("jsonwebtoken")

const login = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM user WHERE username = ?";

    db.query(sql, [username], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan pada database"
            });
        }

        // Username tidak ditemukan
        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Username tidak ditemukan"
            });
        }

        const user = results[0];

        // Password salah
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Password salah"
            });
        }

        const token = jwt.sign(
            {
                id: user.id_user,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        // Login berhasil
        res.status(200).json({
            success: true,
            message: "Login berhasil",
            token: token,
            user: {
                id: user.id_user,
                username: user.username
            }
        });

    });
};

module.exports = {
    login
};