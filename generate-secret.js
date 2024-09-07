const crypto = require('crypto');

function generateSecretKey(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

const secretKey = generateSecretKey();
console.log('Use esta chave como seu JWT_SECRET:');
console.log(secretKey);