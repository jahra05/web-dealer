const db = require("../config/db")

const produk = (req, res) => {

    const { periode, bulan, tahun } = req.query

    let sqlProdukRaport = `
    SELECT
        m.nama_motor,
        k.nama_kategori,
        t.nama_tipe,
        
        m.tahun,
        m.harga,
        m.stok
    FROM motor m
    LEFT JOIN kategori k
        ON m.id_kategori = k.id_kategori
    LEFT JOIN tipe t
        ON m.id_tipe = t.id_tipe
   
`;

    let params = [];

    if (periode === "bulanan") {
        sqlProdukRaport += `
            WHERE MONTH(m.created_at) = ?
            AND YEAR(m.created_at) = ?
        `;
        params.push(bulan, tahun)

    } else if (periode === "tahunan") {
        sqlProdukRaport += `
            WHERE YEAR(m.created_at) = ?
        `;
        params.push(tahun)
    }

    sqlProdukRaport += `
        ORDER BY m.nama_motor ASC
    `;

    db.query(sqlProdukRaport, params, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                error: err
            });
        }

        res.json({
            success: true,
            data: result
        })
    })
}

const pengajuanKredit = (req, res) => {

    const { periode, bulan, tahun } = req.query

    let sqlPengajuanKreditRaport = `
            SELECT
            p.id_pengajuan,
            p.nama,
            p.no_hp,
            p.alamat,
            p.pekerjaan,
            p.tanggal_pengajuan,
            m.nama_motor,
            p.status,
            DATE_FORMAT(p.tanggal_pengajuan,'%d/%m/%Y') AS tanggal
        FROM pengajuan p
        JOIN motor m
            ON p.id_motor = m.id_motor
    `;

    let params = []

    if (periode === "bulanan") {

        sqlPengajuanKreditRaport += `
            WHERE MONTH(P.tanggal_pengajuan)=?
            AND YEAR(p.tanggal_pengajuan)=?
        `;

        params.push(bulan, tahun)

    } else if (periode === "tahunan") {
        sqlPengajuanKreditRaport += `
            WHERE YEAR(P.tanggal_pengajuan)=?
        `;

        params.push(tahun)
    }

    sqlPengajuanKreditRaport += `
        ORDER BY p.tanggal_pengajuan DESC
    `

    db.query(sqlPengajuanKreditRaport, params, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                error: err
            });
        }
        res.json({
            success: true,
            data: result
        })
    })
}

const contact = (req, res) => {

    const { periode, bulan, tahun } = req.query

    let sqlContactRaport = `
        SELECT
        nama,
        email,
        subjek,
        pesan,
        no_hp,
        DATE_FORMAT(created_at,'%d/%m/%Y') AS tanggal
    FROM contact
    `;

    let params = [];

    if (periode === "bulanan") {
        sqlContactRaport += `
         WHERE MONTH(created_at)=?
            AND YEAR(created_at)=?
        `;

        params.push(bulan, tahun)

    } else if (periode === "tahunan") {
        sqlContactRaport += `
            WHERE YEAR(created_at)=?
        `;
        params.push(tahun)

    }
    sqlContactRaport += `
        ORDER BY created_at DESC
    `;

    db.query(sqlContactRaport, params, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                error: err
            });
        }

        res.json({
            success: true,
            data: result
        })
    })
}

const testomoni = (req, res) => {

    const { periode, bulan, tahun } = req.query


    let sqlTestimoniRaport = `
        SELECT
        nama,
        pekerjaan,
        rating,
        isi_testimoni,
        DATE_FORMAT(created_at,'%d/%m/%Y') AS tanggal
    FROM testimoni
    `;
    let params = []

    if (periode === "bulanan") {
        sqlTestimoniRaport += `
         WHERE MONTH(created_at)=?
            AND YEAR(created_at)=?
        `;

        params.push(bulan, tahun)

    } else if (periode === "tahunan") {
        sqlTestimoniRaport += `
            WHERE YEAR(created_at)=?
        `;
        params.push(tahun)

    }

    db.query(sqlTestimoniRaport, params, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                error: err
            });
        }

        res.json({
            success: true,
            data: result
        })
    })
}

module.exports = {
    produk,
    pengajuanKredit,
    contact,
    testomoni
}