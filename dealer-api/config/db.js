const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dealer_motor',
    port: 3306
})

db.connect((err) => {
    if (err) {
        console.log("koneksi databse gagal!")
    } else {
        console.log("Database berhasil terhubung")
    }
})

module.exports = db