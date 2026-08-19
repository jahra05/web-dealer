const multer = require("multer")


const storage = multer.memoryStorage();
const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024 // maksimal 5 mb
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ]
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("File harus berupa JPG, JPEG, PNG atau WEBP"))
        }
    }
})

module.exports = upload