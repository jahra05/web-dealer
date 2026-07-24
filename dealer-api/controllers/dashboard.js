const db = require("../config/db");

const getDashboard = (req, res) => {

    const sqlProduk = `
        SELECT COUNT(*) AS total_produk
        FROM motor
    `;

    db.query(sqlProduk, (err, produk) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data dashboard"
            });
        }


        const sqlPengajuan = `
            SELECT COUNT(*) AS total_pengajuan
            FROM pengajuan
        `;

        db.query(sqlPengajuan, (err, pengajuan) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal mengambil data dashboard"
                });
            }



            const sqlTestimoni = `
                SELECT COUNT(*) AS total_testimoni
                FROM testimoni
            `;

            db.query(sqlTestimoni, (err, testimoni) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Gagal mengambil data dashboard"
                    });
                }



                const sqlFaq = `
                    SELECT COUNT(*) AS total_faq
                    FROM faq
                `;

                db.query(sqlFaq, (err, faq) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Gagal mengambil data dashboard"
                        });
                    }



                    const sqlChart = `
                        SELECT 
                        MONTH(tanggal_pengajuan) AS bulan,
                        COUNT(*) AS total
                        FROM pengajuan
                        GROUP BY MONTH(tanggal_pengajuan)
                        ORDER BY MONTH(tanggal_pengajuan)
                `;

                    db.query(sqlChart, (err, chart) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: "gagal mengambil data chart"
                            })
                        }


                        const sqlPengajuanTerbaru = `
                            SELECT
                                p.id_pengajuan,
                                p.nama,
                                m.nama_motor,
                                p.status,
                                DATE_FORMAT(p.tanggal_pengajuan,'%d/%m/%Y') AS tanggal_pengajuan
                            FROM pengajuan p
                            JOIN motor m
                                ON p.id_motor = m.id_motor
                            ORDER BY p.tanggal_pengajuan DESC
                            LIMIT 4
                            `;


                        db.query(sqlPengajuanTerbaru, (err, pengajuanTerbaru) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: "gagal mengambil pengajuan terbaru"
                                })
                            }

                            const sqlContactTerbaru = `
                                SELECT 
                                    id_message,
                                    nama,
                                    subjek,
                                    status,
                                    created_at
                                FROM contact
                                ORDER BY created_at DESC
                                LIMIT 5
                            `;


                            db.query(sqlContactTerbaru, (err, contactTerbaru) => {
                                if (err) {
                                    return res.status(500).json({
                                        success: false,
                                        message: "Gagal mengabil cntact"
                                    })
                                }


                                const sqlAktivitasTerbaru = `
                                SELECT
                                    nama,
                                    'pengajuan Kredit' AS aktivitas,
                                    tanggal_pengajuan AS tanggal
                                FROM pengajuan

                                UNION ALL 
                                SELECT 
                                    nama,
                                    'Mengirim pesan' AS aktivitas,
                                    created_at AS tanggal
                                FROM contact

                                UNION ALL

                                SELECT 
                                    nama,
                                    'Memberikan teatimoni' AS aktivitas,
                                    created_at AS tanggal
                                FROM testimoni

                                ORDER BY tanggal DESC
                                LIMIT 4
                            `;

                                db.query(sqlAktivitasTerbaru, (err, aktivitasTerbaru) => {
                                    if (err) {
                                        return res.status(500).json({
                                            success: false,
                                            message: "gagal mengabil aktivitas terbaru"
                                        })
                                    }
                                    res.json({
                                        success: true,
                                        data: {
                                            total_produk: produk[0].total_produk,
                                            total_pengajuan: pengajuan[0].total_pengajuan,
                                            total_testimoni: testimoni[0].total_testimoni,
                                            total_faq: faq[0].total_faq,
                                            chart_pengajuan: chart,
                                            pengajuan_terbaru: pengajuanTerbaru,
                                            contact_terbaru: contactTerbaru,
                                            aktivitas_terbaru: aktivitasTerbaru

                                        }
                                    });

                                })



                            })


                        })

                    })




                });


            });

        });

    });

};

module.exports = {
    getDashboard
};