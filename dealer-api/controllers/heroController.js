const db = require('../config/db')

const geHero = (req, res) => {
    const sql = `
        SELECT 
            h.id_hero,
            m.id_motor,
            m.nama_motor,
            m.gambar,
            m.harga,
            m.tahun,
            m.deskripsi,
            m.status,
            k.nama_kategori,
            t.nama_tipe
        FROM hero h
        JOIN motor m
            ON h.id_motor = m.id_motor
        JOIN kategori k
            ON m.id_kategori = k.id_kategori
        JOIN tipe t
            ON m.id_tipe = t.id_tipe
        WHERE m.status = 'Aktif'
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error mengambil hero:", err);

            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data hero",
                error: err.message
            });
        }

        return res.json({
            success: true,
            message: "Data hero berhasil diambil",
            data: result
        });
    });
};

const createHero = (req, res) => {
    const { id_motor } = req.body;

    if (!id_motor) {
        return res.status(400).json({
            success: false,
            message: "Motor wajib dipilih"
        });
    }

    // 1. Cek motor
    const checkMotor = `
        SELECT id_motor, nama_motor, status
        FROM motor
        WHERE id_motor = ?
        AND status = 'Aktif'
    `;

    db.query(checkMotor, [id_motor], (err, result) => {

        if (err) {
            console.error("Error cek motor:", err);

            return res.status(500).json({
                success: false,
                message: "Gagal mengecek motor",
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Motor tidak ditemukan atau sudah nonaktif"
            });
        }

        // 2. Cek apakah sudah ada hero
        const checkHero = `
            SELECT id_hero, id_motor
            FROM hero
            LIMIT 1
        `;

        db.query(checkHero, (err, heroResult) => {

            if (err) {
                console.error("Error cek hero:", err);

                return res.status(500).json({
                    success: false,
                    message: "Gagal mengecek hero",
                    error: err.message
                });
            }

            // 3. Kalau hero sudah ada → UPDATE
            if (heroResult.length > 0) {

                const updateHero = `
                    UPDATE hero
                    SET id_motor = ?
                    WHERE id_hero = ?
                `;

                db.query(
                    updateHero,
                    [id_motor, heroResult[0].id_hero],
                    (err, result) => {

                        if (err) {
                            console.error("Error update hero:", err);

                            return res.status(500).json({
                                success: false,
                                message: "Gagal mengubah hero",
                                error: err.message
                            });
                        }

                        return res.json({
                            success: true,
                            message: "Motor hero berhasil diubah"
                        });
                    }
                );

                return;
            }

            // 4. Kalau belum ada hero → INSERT
            const insertHero = `
                INSERT INTO hero (id_motor)
                VALUES (?)
            `;

            db.query(insertHero, [id_motor], (err, result) => {

                if (err) {
                    console.error("Error menambahkan hero:", err);

                    return res.status(500).json({
                        success: false,
                        message: "Gagal menambahkan hero",
                        error: err.message
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: "Motor berhasil dipilih sebagai hero",
                    id: result.insertId
                });
            });
        });
    });
};

const deleteHero = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM hero
        WHERE id_hero = ?
    `;
    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error('Error mengahapus hero : ', err)

            return res.status(500).json({
                success: false,
                message: "Gagal mengahapus hero",
                error: err.message
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Herp tidak ditemukan"
            })
        }

        res.json({
            success: true,
            message: "Motor berhasil dihapus dari hero"
        })
    })
}

module.exports = {
    geHero,
    createHero,
    deleteHero
}