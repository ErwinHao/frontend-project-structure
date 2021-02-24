const crypto = require('crypto');

const key = crypto.randomBytes(20).toString('hex');
console.log(key);