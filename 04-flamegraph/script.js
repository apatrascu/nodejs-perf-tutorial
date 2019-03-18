"use strict";
const crypto = require('crypto');

function hash(password) {
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
    return hash;
}

for (let i = 0; i < 50; i++) {
    hash('random_password');
}
