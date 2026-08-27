// Run this locally with Node installed:
//   node scripts/hash-password.js "yourpassword"
// Copy the printed hash and paste it into the INSERT statement in schema.sql

const crypto = require('crypto');

const password = process.argv[2];

if (!password) {
  console.log('Usage: node scripts/hash-password.js "yourpassword"');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.scryptSync(password, salt, 64).toString('hex');

console.log('\nYour password hash (paste this into schema.sql):\n');
console.log(`${salt}:${hash}`);
console.log('');
