const db = require("../config/db");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const crypto = require("crypto")
const { Resend } = require("resend")


const resend = new Resend(process.env.RESEND_API_KEY);

const login = async (req, res) => {
    const { email, password } = req.body;

    console.log("EMAIL:", email);
    console.log("PASSWORD INPUT:", password);

    console.log("Email yg laogin ", email)
    const sql = "SELECT * FROM user WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        console.log("HASIL QUERY:", results);

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
                message: "Gagal Memproses Data"
            });
        }

        const user = results[0];
        console.log("Password di database:", user.password);
        console.log("Password yang diinput:", password);

        const isMatch = await bcrypt.compare(password, user.password)
        console.log("PASSWORD DB:", user.password);
        console.log("PASSWORD INPUT:", password);
        console.log("BCRYPT:", isMatch);
        console.log("hasil bcrypt", isMatch)
        // Password salah
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Terjadi Kesalahan Pada Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id_user,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        // Login berhasil
        res.status(200).json({
            success: true,
            message: "Anda Berhasil Login",
            token: token,
            user: {
                id: user.id_user,
                email: user.email
            }
        });

    });
};

// kirim otp

const sendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email wajib diisi"
        });
    }

    const sql = "SELECT * FROM user WHERE email = ?";

    db.query(sql, [email], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan pada database"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Email tidak ditemukan"
            });
        }

        const user = result[0];

        // Generate OTP 6 digit
        const otp = crypto
            .randomInt(100000, 1000000)
            .toString();

        // OTP berlaku 5 menit
        const expiresAt = new Date(
            Date.now() + 5 * 60 * 1000
        );

        const updateOtpSql = `
            UPDATE user
            SET reset_otp = ?,
                reset_otp_expires = ?
            WHERE id_user = ?
        `;

        db.query(
            updateOtpSql,
            [otp, expiresAt, user.id_user],
            async (err) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Gagal membuat OTP"
                    });
                }

                try {

                    const { data, error } = await resend.emails.send({
                        from: "Dealer Admin <onboarding@resend.dev>",
                        to: [user.email],
                        subject: "Kode OTP Reset Password",
                        html: `
                                <div style="font-family: Arial, sans-serif;">
                                    <h2>Reset Password</h2>

                                    <p>
                                        Gunakan kode OTP berikut
                                        untuk mengubah password akun Anda:
                                    </p>

                                    <h1 style="letter-spacing: 8px;">
                                        ${otp}
                                    </h1>

                                    <p>
                                        Kode OTP berlaku selama
                                        <strong>5 menit</strong>.
                                    </p>

                                    <p>
                                        Jika Anda tidak meminta reset password,
                                        abaikan email ini.
                                    </p>
                                </div>
            `
                    })

                    if (error) {
                        console.error("Resend error", error);

                        return res.status(500).json({
                            success: false,
                            message: "Gagal mengirim OTP ke email"
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        message: "OTP berhasil dikirim ke email"
                    });

                } catch (error) {

                    console.error("Resend error:", error);

                    return res.status(500).json({
                        success: false,
                        message: "Gagal mengirim OTP ke email"
                    });
                }
            }
        );
    });
};
const forgotPassword = async (req, res) => {
    const { email, otp, passwordBaru, konfirmasiPassword } = req.body;

    if (!email || !otp || !passwordBaru || !konfirmasiPassword) {
        return res.status(400).json({
            success: false,
            message: "Isi Semua Field"
        })
    }

    if (passwordBaru !== konfirmasiPassword) {
        return res.status(400).json({
            success: false,
            message: "konfimrasi password tidak sesuai"
        })
    }

    const sql = 'SELECT * FROM user WHERE email = ? AND reset_otp = ? AND reset_otp_expires > NOW()';

    db.query(sql, [email, otp], async (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "terjadi kesalahan pada database"
            })
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "email tidak ditemukan"
            })
        }
        const user = results[0]
        const hashPassword = await bcrypt.hash(passwordBaru, 10);
        const updateSql = ` UPDATE user
                    SET password = ?,
                        reset_otp = NULL,
                        reset_otp_expires = NULL
                    WHERE id_user = ?`;
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
    forgotPassword,
    sendOtp
};