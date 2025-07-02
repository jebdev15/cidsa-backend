const db = require('../config/db');

const insertEntry = (data, callback) => {
    const { values, hasReceipt } = data;

    const sql = `
        INSERT INTO entries 
        (sIDType, sID, sLastName, sFirstName, sMI, cLastName, cFirstName, cMI, cContact, cRelationship, 
         cAddress, cCity, cZip, cProvince, campus, college, program, major, level, section, picture, signature${hasReceipt ? ', receipt' : ''}) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?${hasReceipt ? ', ?' : ''})
    `;

    db.query(sql, values, callback);
};

module.exports = { insertEntry };
