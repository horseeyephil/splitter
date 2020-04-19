const fs = require('fs')

const nextName = new Date().toISOString().slice(0, 19)
const path = `archived/${nextName}-payment.yml`

fs.copyFileSync('period.yml', path)
fs.copyFileSync('archived/demo.yml', 'period.yml')

console.log('Payment confirmed. Archived');