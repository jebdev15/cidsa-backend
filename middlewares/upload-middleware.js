const multer = require('multer');
const path = require('path');
const fs = require('fs');

const allowedTypes = ['image/jpeg', 'image/png'];
const maxFileSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const campus = req.body.campus;
        if (!campus) return cb(new Error('Campus is required'), null);

        let subDir = 'others';
        if (file.fieldname === 'picture') subDir = 'pictures';
        if (file.fieldname === 'signature') subDir = 'signatures';
        if (file.fieldname === 'receipt') subDir = 'receipts';

        const dir = path.join(__dirname, '..', 'uploads', campus, subDir);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '_' + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG and PNG files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSize }
});

module.exports = upload;
