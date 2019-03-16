"use strict";
const crypto = require('crypto');

function hash(password, cb) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2(password, salt, 10000, 512, 'sha512', cb);
  return hash;
}

for (let i = 0; i < 50; i++) {
  hash('random_password', (error, hash) => hash);
}