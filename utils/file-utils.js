const fs = require('fs');
const path = require('path');

const ensureDirectories = (campus) => {
    const baseDir = path.join(__dirname, '..', 'uploads', campus);

    const dirs = ['pictures', 'signatures', 'receipts'];
    dirs.forEach(subDir => {
        const fullPath = path.join(baseDir, subDir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }
    });
};

module.exports = { ensureDirectories };
