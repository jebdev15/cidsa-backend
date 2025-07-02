const { processEntry } = require('../services/entry-service');

const submitEntry = (req, res) => {
    processEntry(req.body, req.files, (error, result) => {
        if (error) {
            return res.status(error.status).json({ success: false, message: error.message });
        }
        res.json(result);
    });
};

module.exports = { submitEntry };
