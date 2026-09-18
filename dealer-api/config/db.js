const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    // ssl: {
    //     rejectUnauthorized: false
    // }
});

db.query("SELECT 1", (err) => {
    if (err) {
        console.log("Koneksi database gagal!");
        console.log(err);
    } else {
        console.log("Database berhasil terhubung");
        console.log("database ", process.env.DB_NAME,)
    }
});

module.exports = db;