const { insertEntry } = require('../models/entry-model');
const { ensureDirectories } = require('../utils/file-utils');

const processEntry = (data, files, callback) => {
    const campus = data.campus;

    if (!campus) {
        return callback({ status: 400, message: 'Campus is required' });
    }

    ensureDirectories(campus);

    const picture = files?.picture?.[0]?.filename;
    const signature = files?.signature?.[0]?.filename;
    const receipt = files?.receipt?.[0]?.filename || null;

    if (!picture || !signature) {
        return callback({ status: 400, message: 'Picture and Signature are required' });
    }

    const values = [
        data.sIDType || '',
        data.sID || '',
        data.sLastName || '',
        data.sFirstName || '',
        data.sMI || '',
        data.cLastName || '',
        data.cFirstName || '',
        data.cMI || '',
        data.cContact || '',
        data.cRelationship || '',
        data.cAddress || '',
        data.cCity || '',
        data.cZip || '',
        data.cProvince || '',
        campus,
        data.college || '',
        data.program || '',
        data.major || '',
        data.level || '',
        data.section || '',
        picture,
        signature
    ];

    const hasReceipt = !!receipt;
    if (hasReceipt) values.push(receipt);

    insertEntry({ values, hasReceipt }, (err) => {
        if (err) {
            return callback({ status: 500, message: 'There was an error processing your entry', error: "Database Error" });
        }
        return callback(null, { success: true });
    });
};

module.exports = { processEntry };
