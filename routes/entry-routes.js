const express = require('express');
const router = express.Router();
const { submitEntry } = require('../controllers/entry-controller');
const upload = require('../middlewares/upload-middleware');

router.post('/submit', upload.fields([
    { name: 'picture', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
    { name: 'receipt', maxCount: 1 }
]), submitEntry);

module.exports = router;
